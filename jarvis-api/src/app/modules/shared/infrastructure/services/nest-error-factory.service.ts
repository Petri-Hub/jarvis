import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../domain/constants/errors.constants';
import { ErrorResponseData, ValidationErrorItem } from '../../domain/types/error-response';

@Injectable()
export class NestErrorFactoryService {
  createValidationException(errors: ValidationError[]): BadRequestException {
    const formattedErrors = this.formatValidationErrors(errors);

    const response: ErrorResponseData = {
      code: ErrorCodes.VALIDATION_ERROR,
      title: ErrorTitles.VALIDATION_ERROR,
      description: ErrorMessages.VALIDATION_ERROR,
      status: HttpStatus.BAD_REQUEST,
      errors: formattedErrors,
    };

    return new BadRequestException(response);
  }

  private formatValidationErrors(errors: ValidationError[]): ValidationErrorItem[] {
    const errorMap = new Map<string, string[]>();

    errors.forEach((error) => {
      this.collectErrors(error, '', errorMap);
    });

    return Array.from(errorMap.entries()).map(([pointer, messages]) => ({
      pointer,
      detail: messages.join(', '),
    }));
  }

  private collectErrors(
    error: ValidationError,
    parentPath: string,
    errorMap: Map<string, string[]>,
  ): void {
    const currentPath = parentPath ? `${parentPath}.${error.property}` : error.property;

    if (error.constraints) {
      const messages = Object.values(error.constraints);
      const existingMessages = errorMap.get(currentPath) || [];
      errorMap.set(currentPath, [...existingMessages, ...messages]);
    }

    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        this.collectErrors(child, currentPath, errorMap);
      });
    }
  }
}
