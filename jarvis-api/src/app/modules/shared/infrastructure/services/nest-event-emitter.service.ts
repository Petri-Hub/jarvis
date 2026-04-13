import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventEmiiter as EventEmitter } from '../../domain/services/event-emitter.service';
import { Injectable } from '@nestjs/common';
import { BaseEvent } from '../../domain/entities/base.event';

@Injectable()
export class NestEventEmitterService implements EventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit(event: BaseEvent<unknown>): Promise<void> {
    await this.eventEmitter.emitAsync(event.type, event);
  }
}
