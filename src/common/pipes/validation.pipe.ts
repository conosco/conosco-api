import {
  Injectable,
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate, IsEmpty } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as validatejs from 'validate.js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { forbidUnknownValues: true });

    if (errors.length > 0) {
      throw new HttpException(
        { errors: this.formatErrors(errors) },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private formatErrors(errors: any[]) {
    const msg = [];
    errors.forEach(err => {
      const target = { property: null, constraints: [] };
      target.property = err.property;
      target.constraints.push(err.constraints);

      return msg.push(target);
    });
    return msg;
  }

  private isEmpty(target: any) {
    if (target.length > 0) {
      console.log('isempt');
      return false;
    }
    if (validatejs.isEmpty(target)) {
      console.log('isempt');
      return true;
    }
    return { target };
  }
}
