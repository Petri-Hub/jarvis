import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckListingFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckListingFailedError extends BaseError {
  constructor({ cause, metadata }: TruckListingFailedErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_LISTING_FAILED,
      title: ErrorTitles.TRUCK_LISTING_FAILED,
      message: ErrorMessages.TRUCK_LISTING_FAILED,
      cause,
      metadata,
    });
  }
}
