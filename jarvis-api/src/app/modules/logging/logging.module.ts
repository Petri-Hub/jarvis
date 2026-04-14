import { Global, Module } from '@nestjs/common';
import { Logger } from './infrastructure/logger.service';

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggingModule {}
