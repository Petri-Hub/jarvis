import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckPersistenceErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckPersistenceError extends BaseError {
  constructor({ cause, metadata }: TruckPersistenceErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_PERSISTENCE_ERROR,
      title: ErrorTitles.TRUCK_PERSISTENCE_ERROR,
      message: ErrorMessages.TRUCK_PERSISTENCE_ERROR,
      cause,
      metadata,
    });
  }
}
