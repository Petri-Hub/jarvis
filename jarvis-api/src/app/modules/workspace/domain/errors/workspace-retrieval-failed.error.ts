import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceRetrievalFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceRetrievalFailedError extends BaseError {
  constructor({ cause, metadata }: WorkspaceRetrievalFailedErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_RETRIEVAL_FAILED,
      title: ErrorTitles.WORKSPACE_RETRIEVAL_FAILED,
      message: ErrorMessages.WORKSPACE_RETRIEVAL_FAILED,
      cause,
      metadata,
    });
  }
}