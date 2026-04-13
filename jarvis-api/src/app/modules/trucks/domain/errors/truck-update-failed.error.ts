import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckUpdateFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckUpdateFailedError extends BaseError {
  constructor({ cause, metadata }: TruckUpdateFailedErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_UPDATE_FAILED,
      title: ErrorTitles.TRUCK_UPDATE_FAILED,
      message: ErrorMessages.TRUCK_UPDATE_FAILED,
      cause,
      metadata,
    });
  }
}
