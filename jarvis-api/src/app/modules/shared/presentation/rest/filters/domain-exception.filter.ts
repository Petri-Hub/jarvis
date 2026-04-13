import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseError } from '../../../domain/errors/base.error';
import { ERROR_CODE_TO_HTTP_STATUS } from '../constants/error-http-status.constants';
import { ErrorResponseDto } from '../dtos/error-response.dto';
import { Logger } from '../../../../logging/infrastructure/logger.service';

@Catch(BaseError)
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly adapter: HttpAdapterHost, private readonly logger: Logger) {
    this.logger.setContext(DomainExceptionFilter.name);
  }

  public catch(error: BaseError, host: ArgumentsHost): void {
    const response = this.getResponseReference(host);
    const body = this.createResponseBody(error);

    this.logErrorRecursively(error);
    this.replyResponseWithError(response, body);
  }

  private getResponseReference(host: ArgumentsHost) {
    return host.switchToHttp().getResponse();
  }

  private createResponseBody(exception: BaseError): ErrorResponseDto {
    const status = this.getErrorStatusForBaseError(exception);
    return {
      code: exception.code,
      title: exception.title,
      description: exception.message,
      status,
      metadata: exception.metadata,
    };
  }

  private getErrorStatusForBaseError(exception: BaseError): number {
    return ERROR_CODE_TO_HTTP_STATUS[exception.code] || 500;
  }

  private replyResponseWithError(response: Record<string, unknown>, body: ErrorResponseDto): void {
    this.adapter.httpAdapter.reply(response, body, body.status);
  }

  private logErrorRecursively(error: BaseError): void {
    if (error instanceof BaseError) {
      this.logBaseError(error);
      this.logErrorRecursively(error.cause as BaseError);
    } else {
      this.logUnknownError(error);
    }
  }

  private logBaseError(error: BaseError): void {
    this.logger.error({
      message: `A domain error occurred`,
      stack: error.stack,
      context: {
        code: error.code,
        title: error.title,
        message: error.message,
        metadata: error.metadata,
      },
    });
  }

  private logUnknownError(error: Error): void {
    this.logger.error({
      message: `An unknown error occurred`,
      stack: error.stack,
    });
  }
}
