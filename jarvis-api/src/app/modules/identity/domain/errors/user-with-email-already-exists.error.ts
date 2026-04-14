import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type UserWithEmailAlreadyExistsErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class UserWithEmailAlreadyExistsError extends BaseError {
  constructor({ cause, metadata }: UserWithEmailAlreadyExistsErrorProps = {}) {
    super({
      code: ErrorCodes.USER_ALREADY_EXISTS,
      title: ErrorTitles.USER_ALREADY_EXISTS,
      message: ErrorMessages.USER_ALREADY_EXISTS,
      cause,
      metadata,
    });
  }
}