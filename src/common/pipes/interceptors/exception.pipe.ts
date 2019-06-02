import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import * as moment from 'moment';
import { ResponseTransformInterceptor } from './response.pipe';
import { ResponseDTO } from '../dto/response.dto';

@Catch()
@UseInterceptors(ResponseTransformInterceptor)
export class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let statusCode: number;

    if (exception instanceof EntityNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND;
    } else {
      statusCode = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const date = new Date();
    const timestamp = moment(date).format('YYYY-MM-DD');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const error = true;
    const data = null;

    let errorResponse = new ResponseDTO();

    errorResponse = {
      statusCode,
      timestamp,
      error,
      path: request.url,
      method: request.method,
      message:
        statusCode !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.error || exception.message || null
          : 'Internal server error',
      data,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      null,
      'ExceptionHttpFilter',
    );

    return response.status(statusCode).json(errorResponse);
  }
}
