import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from './entity/http-exception-response.interface';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred';
    }

    const errorResponse: CustomHttpExceptionResponse = this.getErrorResponse(
      status,
      errorMessage,
      request,
    );
    const errorLog: string = this.getErrorLog(
      errorResponse,
      request,
      exception,
    );
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, error } = errorResponse;
    const { method, url } = request;
    return `Response code: ${statusCode} - Method: ${method} - URL: ${url}
        ${JSON.stringify(errorResponse)}
        User: ${JSON.stringify(request.user ?? 'Not signed in')}
        ${exception instanceof HttpException ? exception.stack : error}`;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile('error.log', errorLog, 'utf8', (error) => {
      if (error) throw error;
    });
  };
}
