import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceListingFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceListingFailedError extends BaseError {
  constructor({ cause, metadata }: WorkspaceListingFailedErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_LISTING_FAILED,
      title: ErrorTitles.WORKSPACE_LISTING_FAILED,
      message: ErrorMessages.WORKSPACE_LISTING_FAILED,
      cause,
      metadata,
    });
  }
}