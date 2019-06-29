import {
  Injectable,
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Messages } from '../../../consts/messages/messages.portuguese';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    if (object instanceof Object && this.isEmpty(object)) {
      throw new BadRequestException(Messages.error.EMPTY_BODY);
    }

    const errors = await validate(object, { forbidUnknownValues: true });
    if (errors.length > 0) {
      throw new BadRequestException({ errors: this.formatErrors(errors) });
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

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }
}
