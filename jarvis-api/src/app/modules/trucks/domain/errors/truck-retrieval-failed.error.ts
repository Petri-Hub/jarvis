import {
  ErrorCodes,
  ErrorMessages,
  ErrorTitles,
} from '../../../shared/domain/constants/errors.constants';
import { BaseError } from '../../../shared/domain/errors/base.error';

type TruckRetrievalFailedErrorProps = {
  cause?: unknown;
  metadata?: object;
};

export class TruckRetrievalFailedError extends BaseError {
  constructor({ cause, metadata }: TruckRetrievalFailedErrorProps = {}) {
    super({
      code: ErrorCodes.TRUCK_RETRIEVAL_FAILED,
      title: ErrorTitles.TRUCK_RETRIEVAL_FAILED,
      message: ErrorMessages.TRUCK_RETRIEVAL_FAILED,
      cause,
      metadata,
    });
  }
}
