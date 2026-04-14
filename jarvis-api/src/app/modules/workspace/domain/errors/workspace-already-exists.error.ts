import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceAlreadyExistsErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceAlreadyExistsError extends BaseError {
  constructor({ cause, metadata }: WorkspaceAlreadyExistsErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_ALREADY_EXISTS,
      title: ErrorTitles.WORKSPACE_ALREADY_EXISTS,
      message: ErrorMessages.WORKSPACE_ALREADY_EXISTS,
      cause,
      metadata,
    });
  }
}