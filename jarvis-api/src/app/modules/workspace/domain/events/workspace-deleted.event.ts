import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';

export type WorkspaceDeletedEventProps = {
  id: string;
  deletedAt: Date;
};

export class WorkspaceDeletedEvent extends BaseEvent<WorkspaceDeletedEventProps> {
  constructor(payload: WorkspaceDeletedEventProps) {
    super({ type: EventTypes.WORKSPACE_DELETED, payload });
  }
}