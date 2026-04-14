import { BaseError } from '../../../shared/domain/errors/base.error';
import { ErrorCodes, ErrorTitles, ErrorMessages } from '../../../shared/domain/constants/errors.constants';

export type WorkspacePersistenceErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class WorkspacePersistenceError extends BaseError {
  constructor({ cause, metadata }: WorkspacePersistenceErrorProps = {}) {
    super({
      code: ErrorCodes.WORKSPACE_PERSISTENCE_ERROR,
      title: ErrorTitles.WORKSPACE_PERSISTENCE_ERROR,
      message: ErrorMessages.WORKSPACE_PERSISTENCE_ERROR,
      cause,
      metadata,
    });
  }
}