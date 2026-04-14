import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceNotFoundErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceNotFoundError extends BaseError {
  constructor({ cause, metadata }: WorkspaceNotFoundErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_NOT_FOUND,
      title: ErrorTitles.WORKSPACE_NOT_FOUND,
      message: ErrorMessages.WORKSPACE_NOT_FOUND,
      cause,
      metadata,
    });
  }
}