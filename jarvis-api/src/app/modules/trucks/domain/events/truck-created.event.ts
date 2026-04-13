import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';

type TruckCreatedEventProps = {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
};

export class TruckCreatedEvent extends BaseEvent<TruckCreatedEventProps> {
  constructor(payload: TruckCreatedEventProps) {
    super({
      type: EventTypes.TRUCK_CREATED,
      payload,
    });
  }
}
