import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceDeletionFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceDeletionFailedError extends BaseError {
  constructor({ cause, metadata }: WorkspaceDeletionFailedErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_DELETION_FAILED,
      title: ErrorTitles.WORKSPACE_DELETION_FAILED,
      message: ErrorMessages.WORKSPACE_DELETION_FAILED,
      cause,
      metadata,
    });
  }
}