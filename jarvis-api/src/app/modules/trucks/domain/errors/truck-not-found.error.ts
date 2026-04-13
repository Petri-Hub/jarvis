import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckNotFoundErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckNotFoundError extends BaseError {
  constructor({ cause, metadata }: TruckNotFoundErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_NOT_FOUND,
      title: ErrorTitles.TRUCK_NOT_FOUND,
      message: ErrorMessages.TRUCK_NOT_FOUND,
      cause,
      metadata,
    });
  }
}
