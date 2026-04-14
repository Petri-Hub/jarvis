import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';
import { WorkspaceStatus } from '../entities/workspace.entity';

export type WorkspaceCreatedEventProps = {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  status: WorkspaceStatus;
  createdAt: Date;
  updatedAt: Date;
};

export class WorkspaceCreatedEvent extends BaseEvent<WorkspaceCreatedEventProps> {
  constructor(payload: WorkspaceCreatedEventProps) {
    super({ type: EventTypes.WORKSPACE_CREATED, payload });
  }
}