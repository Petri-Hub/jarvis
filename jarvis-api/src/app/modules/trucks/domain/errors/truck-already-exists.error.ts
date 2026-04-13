import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckAlreadyExistsErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckAlreadyExistsError extends BaseError {
  constructor({ cause, metadata }: TruckAlreadyExistsErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_ALREADY_EXISTS,
      title: ErrorTitles.TRUCK_ALREADY_EXISTS,
      message: ErrorMessages.TRUCK_ALREADY_EXISTS,
      cause,
      metadata,
    });
  }
}
