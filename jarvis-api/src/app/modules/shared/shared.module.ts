import { Global, Module } from '@nestjs/common';
import { EventEmiiter as EventEmitter } from './domain/services/event-emitter.service';
import { NestEventEmitterService } from './infrastructure/services/nest-event-emitter.service';
import { NestErrorFactoryService } from './infrastructure/services/nest-error-factory.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: EventEmitter,
      useClass: NestEventEmitterService,
    },
    NestErrorFactoryService,
  ],
  exports: [EventEmitter, NestErrorFactoryService],
})
export class SharedModule {}
