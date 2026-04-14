import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type InvalidCredentialsErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class InvalidCredentialsError extends BaseError {
  constructor({ cause, metadata }: InvalidCredentialsErrorProps = {}) {
    super({
      code: ErrorCodes.INVALID_CREDENTIALS,
      title: ErrorTitles.INVALID_CREDENTIALS,
      message: ErrorMessages.INVALID_CREDENTIALS,
      cause,
      metadata,
    });
  }
}