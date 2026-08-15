import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isKnownHttpException = exception instanceof HttpException;

    const statusCode = isKnownHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isKnownHttpException
      ? exception.getResponse()
      : 'Ocurrio un error inesperado, intenta de nuevo';

    if (!isKnownHttpException) {
      this.logger.error(
        `Error no controlado en ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(statusCode).json({
      statusCode,
      path: request.url,
      timestamp: new Date().toISOString(),
      ...(typeof message === 'string' ? { message } : message),
    });
  }
}