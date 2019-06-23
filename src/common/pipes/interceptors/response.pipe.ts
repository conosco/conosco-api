import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ResponseDTO } from '../dto/response.dto';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ResponseDTO<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDTO<T>> {
    const date = new Date();
    const ctx = context.switchToHttp();
    const contextRequest = ctx.getRequest();
    const contextResponse = ctx.getResponse();

    const statusCode = contextResponse.statusCode;
    const method = contextRequest.method;
    const path = contextRequest.url;
    const error = statusCode < 200 || statusCode > 299 ? true : false;
    const timestamp = moment(date).format('YYYY-MM-DD');
    return next.handle().pipe(
      map(payload => ({
        statusCode,
        timestamp,
        error,
        path,
        method,
        message: payload.message,
        data: payload.data,
      })),
    );
  }
}
