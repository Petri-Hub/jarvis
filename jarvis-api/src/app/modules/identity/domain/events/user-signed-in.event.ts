import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';
import { UserStatus } from '../entities/user.entity';

export type UserSignedInEventProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export class UserSignedInEvent extends BaseEvent<UserSignedInEventProps> {
  constructor(payload: UserSignedInEventProps) {
    super({ type: EventTypes.USER_SIGNED_IN, payload });
  }
}