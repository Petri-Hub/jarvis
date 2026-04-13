import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';

type TruckUpdatedEventProps = {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
};

export class TruckUpdatedEvent extends BaseEvent<TruckUpdatedEventProps> {
  constructor(payload: TruckUpdatedEventProps) {
    super({
      type: EventTypes.TRUCK_UPDATED,
      payload,
    });
  }
}
