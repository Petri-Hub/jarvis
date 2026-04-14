import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type UserCreationFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class UserCreationFailedError extends BaseError {
  constructor({ cause, metadata }: UserCreationFailedErrorProps = {}) {
    super({
      code: ErrorCodes.USER_CREATION_FAILED,
      title: ErrorTitles.USER_CREATION_FAILED,
      message: ErrorMessages.USER_CREATION_FAILED,
      cause,
      metadata,
    });
  }
}