import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  override log({ message, context }: LogProps): void {
    super.log(message, context);
  }

  override error({ message, stack, context }: ErrorLogProps): void {
    super.error(message, stack, context);
  }

  override warn({ message, context }: LogProps): void {
    super.warn(message, context);
  }

  override debug({ message, context }: LogProps): void {
    super.debug(message, context);
  }

  override verbose({ message, context }: LogProps): void {
    super.verbose(message, context);
  }
}

type LogProps = {
  message: string;
  context?: object;
};

type ErrorLogProps = LogProps & {
  stack?: string;
};
