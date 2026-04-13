import { ErrorCodes, ErrorMessages, ErrorTitles } from '../constants/errors.constants';

type ErrorProps = {
  code: ErrorCodes;
  title: ErrorTitles;
  message: ErrorMessages;
  cause?: unknown;
  metadata?: object;
};

export abstract class BaseError extends Error {
  public readonly code: ErrorCodes;
  public readonly title: ErrorTitles;
  public readonly metadata: object;

  constructor({
    code = ErrorCodes.UNKNOWN_ERROR,
    title = ErrorTitles.UNKNOWN_ERROR,
    message = ErrorMessages.UNKNOWN_ERROR,
    cause,
    metadata = {},
  }: ErrorProps) {
    super(message, { cause });
    this.code = code;
    this.title = title;
    this.metadata = metadata;
  }
}
