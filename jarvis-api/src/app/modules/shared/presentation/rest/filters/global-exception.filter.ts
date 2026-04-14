import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseError } from '../../../domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../domain/constants/errors.constants';
import { ErrorResponseDto } from '../dtos/error-response.dto';
import { Logger } from '../../../../logging/infrastructure/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly adapter: HttpAdapterHost, private readonly logger: Logger) {
    this.logger.setContext(GlobalExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    if (this.isExceptionCaughtABaseError(exception)) {
      throw exception;
    }

    const response = this.getResponseReference(host);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      this.adapter.httpAdapter.reply(response, exceptionResponse, status);
      return;
    }

    const body = this.createResponseBody();
    this.replyResponseWithError(response, body);
  }

  private getResponseReference(host: ArgumentsHost) {
    return host.switchToHttp().getResponse();
  }

  private createResponseBody(): ErrorResponseDto {
    return {
      code: ErrorCodes.UNKNOWN_ERROR,
      title: ErrorTitles.UNKNOWN_ERROR,
      description: ErrorMessages.UNKNOWN_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  private isExceptionCaughtABaseError(exception: unknown): boolean {
    return exception instanceof BaseError;
  }

  private replyResponseWithError(response: Record<string, unknown>, body: ErrorResponseDto): void {
    this.adapter.httpAdapter.reply(response, body, body.status);
  }
}
