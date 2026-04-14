import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type UserPersistenceErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class UserPersistenceError extends BaseError {
  constructor({ cause, metadata }: UserPersistenceErrorProps = {}) {
    super({
      code: ErrorCodes.USER_PERSISTENCE_ERROR,
      title: ErrorTitles.USER_PERSISTENCE_ERROR,
      message: ErrorMessages.USER_PERSISTENCE_ERROR,
      cause,
      metadata,
    });
  }
}