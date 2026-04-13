import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckDeletionFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckDeletionFailedError extends BaseError {
  constructor({ cause, metadata }: TruckDeletionFailedErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_DELETION_FAILED,
      title: ErrorTitles.TRUCK_DELETION_FAILED,
      message: ErrorMessages.TRUCK_DELETION_FAILED,
      cause,
      metadata,
    });
  }
}
