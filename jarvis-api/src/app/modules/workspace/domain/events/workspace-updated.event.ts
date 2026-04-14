import { BaseEvent } from '../../../shared/domain/entities/base.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';
import { WorkspaceStatus } from '../entities/workspace.entity';

export type WorkspaceUpdatedEventProps = {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  status: WorkspaceStatus;
  updatedAt: Date;
};

export class WorkspaceUpdatedEvent extends BaseEvent<WorkspaceUpdatedEventProps> {
  constructor(payload: WorkspaceUpdatedEventProps) {
    super({ type: EventTypes.WORKSPACE_UPDATED, payload });
  }
}