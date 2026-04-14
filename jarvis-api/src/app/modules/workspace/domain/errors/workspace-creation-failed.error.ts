import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceCreationFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceCreationFailedError extends BaseError {
  constructor({ cause, metadata }: WorkspaceCreationFailedErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_CREATION_FAILED,
      title: ErrorTitles.WORKSPACE_CREATION_FAILED,
      message: ErrorMessages.WORKSPACE_CREATION_FAILED,
      cause,
      metadata,
    });
  }
}