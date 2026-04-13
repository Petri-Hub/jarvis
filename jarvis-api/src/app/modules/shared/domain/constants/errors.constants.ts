export enum ErrorCodes {
  UNKNOWN_ERROR = 'S001',
  VALIDATION_ERROR = 'S002',
  TRUCK_NOT_FOUND = 'T001',
  TRUCK_ALREADY_EXISTS = 'T002',
  TRUCK_RETRIEVAL_FAILED = 'T003',
  TRUCK_LISTING_FAILED = 'T004',
  TRUCK_CREATION_FAILED = 'T005',
  TRUCK_UPDATE_FAILED = 'T006',
  TRUCK_DELETION_FAILED = 'T007',
  TRUCK_PERSISTENCE_ERROR = 'T008',
}

export enum ErrorTitles {
  UNKNOWN_ERROR = 'Unknown error',
  VALIDATION_ERROR = 'Validation error',
  TRUCK_NOT_FOUND = 'Truck not found',
  TRUCK_ALREADY_EXISTS = 'Truck already exists',
  TRUCK_RETRIEVAL_FAILED = 'Truck retrieval failed',
  TRUCK_LISTING_FAILED = 'Truck listing failed',
  TRUCK_CREATION_FAILED = 'Truck creation failed',
  TRUCK_UPDATE_FAILED = 'Truck update failed',
  TRUCK_DELETION_FAILED = 'Truck deletion failed',
  TRUCK_PERSISTENCE_ERROR = 'Truck persistence error',
}

export enum ErrorMessages {
  UNKNOWN_ERROR = 'An unknown error occurred.',
  VALIDATION_ERROR = 'Validation failed.',
  TRUCK_NOT_FOUND = 'The truck with the given ID was not found.',
  TRUCK_ALREADY_EXISTS = 'The truck with the given license plate already exists.',
  TRUCK_RETRIEVAL_FAILED = 'Failed to retrieve the truck.',
  TRUCK_LISTING_FAILED = 'Failed to list trucks.',
  TRUCK_CREATION_FAILED = 'Failed to create the truck.',
  TRUCK_UPDATE_FAILED = 'Failed to update the truck.',
  TRUCK_DELETION_FAILED = 'Failed to delete the truck.',
  TRUCK_PERSISTENCE_ERROR = 'A database error occurred while persisting truck data.',
}
