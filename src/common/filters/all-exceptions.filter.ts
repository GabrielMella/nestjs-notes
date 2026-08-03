import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global exception filter.
 *
 * Catches every unhandled exception thrown within the application and
 * returns a sanitized response to the client, avoiding leaking internal
 * details (stack traces, error messages from third-party libraries,
 * database errors, etc). The full error is still logged server-side for
 * debugging purposes.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Only expose the message when it comes from a known HttpException
    // (e.g. NotFoundException, BadRequestException). Anything else is
    // replaced by a generic message so internal details are never exposed.
    const message = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    this.logger.error(
      `${request.method} ${request.url} -> ${status}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
