import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspaceSlugAlreadyExistsErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspaceSlugAlreadyExistsError extends BaseError {
  constructor({ cause, metadata }: WorkspaceSlugAlreadyExistsErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_SLUG_ALREADY_EXISTS,
      title: ErrorTitles.WORKSPACE_SLUG_ALREADY_EXISTS,
      message: ErrorMessages.WORKSPACE_SLUG_ALREADY_EXISTS,
      cause,
      metadata,
    });
  }
}