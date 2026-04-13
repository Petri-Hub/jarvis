import { BaseEvent } from '../entities/base.event';

export abstract class EventEmiiter {
  abstract emit(event: BaseEvent<unknown>): Promise<void>;
}
