import { EventTypes } from '../constants/events.constants';

type EventProps<T> = {
  id?: string;
  version?: string;
  timestamp?: Date;
  type: EventTypes;
  payload: T;
};

export abstract class BaseEvent<T> {
  public readonly id: string;
  public readonly version: string;
  public readonly timestamp: Date;
  public readonly type: EventTypes;
  public readonly payload: T;

  constructor({
    id = crypto.randomUUID(),
    version = '1',
    timestamp = new Date(),
    type,
    payload,
  }: EventProps<T>) {
    this.id = id;
    this.version = version;
    this.timestamp = timestamp;
    this.type = type;
    this.payload = payload;
  }
}
