import { ErrorCodes } from '../../../domain/constants/errors.constants';

export const ERROR_CODE_TO_HTTP_STATUS: Record<ErrorCodes, number> = {
  [ErrorCodes.UNKNOWN_ERROR]: 500,
  [ErrorCodes.VALIDATION_ERROR]: 400,
  [ErrorCodes.TRUCK_NOT_FOUND]: 404,
  [ErrorCodes.TRUCK_ALREADY_EXISTS]: 409,
  [ErrorCodes.TRUCK_RETRIEVAL_FAILED]: 500,
  [ErrorCodes.TRUCK_LISTING_FAILED]: 500,
  [ErrorCodes.TRUCK_CREATION_FAILED]: 500,
  [ErrorCodes.TRUCK_UPDATE_FAILED]: 500,
  [ErrorCodes.TRUCK_DELETION_FAILED]: 500,
  [ErrorCodes.TRUCK_PERSISTENCE_ERROR]: 500,
  [ErrorCodes.USER_NOT_FOUND]: 404,
  [ErrorCodes.USER_ALREADY_EXISTS]: 409,
  [ErrorCodes.INVALID_CREDENTIALS]: 401,
  [ErrorCodes.USER_CREATION_FAILED]: 500,
  [ErrorCodes.USER_AUTH_FAILED]: 500,
  [ErrorCodes.USER_PERSISTENCE_ERROR]: 500,
};
