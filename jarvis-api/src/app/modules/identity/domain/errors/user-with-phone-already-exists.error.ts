import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type UserWithPhoneAlreadyExistsErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class UserWithPhoneAlreadyExistsError extends BaseError {
  constructor({ cause, metadata }: UserWithPhoneAlreadyExistsErrorProps = {}) {
    super({
      code: ErrorCodes.USER_ALREADY_EXISTS,
      title: ErrorTitles.USER_ALREADY_EXISTS,
      message: ErrorMessages.USER_ALREADY_EXISTS,
      cause,
      metadata,
    });
  }
}