import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckCreationFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckCreationFailedError extends BaseError {
  constructor({ cause, metadata }: TruckCreationFailedErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_CREATION_FAILED,
      title: ErrorTitles.TRUCK_CREATION_FAILED,
      message: ErrorMessages.TRUCK_CREATION_FAILED,
      cause,
      metadata,
    });
  }
}
