import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';

type TruckDeletedEventProps = {
  id: number;
  licensePlate: string;
};

export class TruckDeletedEvent extends BaseEvent<TruckDeletedEventProps> {
  constructor(payload: TruckDeletedEventProps) {
    super({
      type: EventTypes.TRUCK_DELETED,
      payload,
    });
  }
}
