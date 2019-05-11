import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import * as moment from 'moment';

@Catch(HttpException, EntityNotFoundError, Error)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: any;

    if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
    } else {
      status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const date = new Date();
    const timestamp = moment(date).format('YYYY-MM-DD');

    const errorResponse = {
      code: status,
      timestamp,
      error: true,
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.error || exception.message || null
          : 'Internal server error',
    };
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${request.method} ${request.url}`,
        // exception.stack,
        'ExceptionHttpFilter',
      );
    } else {
      Logger.error(
        `${request.method} ${request.url} ${JSON.stringify(errorResponse)}`,
        null,
        'ExceptionHttpFilter',
      );
    }

    response.status(status).json(errorResponse);
  }
}
