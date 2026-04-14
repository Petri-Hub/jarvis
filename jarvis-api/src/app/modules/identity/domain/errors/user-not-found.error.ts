import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type UserNotFoundErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class UserNotFoundError extends BaseError {
  constructor({ cause, metadata }: UserNotFoundErrorProps = {}) {
    super({
      code: ErrorCodes.USER_NOT_FOUND,
      title: ErrorTitles.USER_NOT_FOUND,
      message: ErrorMessages.USER_NOT_FOUND,
      cause,
      metadata,
    });
  }
}