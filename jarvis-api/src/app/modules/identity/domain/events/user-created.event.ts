import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';
import { UserStatus } from '../entities/user.entity';

export type UserCreatedEventProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export class UserCreatedEvent extends BaseEvent<UserCreatedEventProps> {
  constructor(payload: UserCreatedEventProps) {
    super({ type: EventTypes.USER_CREATED, payload });
  }
}