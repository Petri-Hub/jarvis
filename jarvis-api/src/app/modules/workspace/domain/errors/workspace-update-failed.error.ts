import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceUpdateFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceUpdateFailedError extends BaseError {
  constructor({ cause, metadata }: WorkspaceUpdateFailedErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_UPDATE_FAILED,
      title: ErrorTitles.WORKSPACE_UPDATE_FAILED,
      message: ErrorMessages.WORKSPACE_UPDATE_FAILED,
      cause,
      metadata,
    });
  }
}