import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../domain/repositories/workspace.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { WorkspaceDeletionFailedError } from '../../domain/errors/workspace-deletion-failed.error';
import { WorkspaceNotFoundError } from '../../domain/errors/workspace-not-found.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { WorkspaceDeletedEvent } from '../../domain/events/workspace-deleted.event';

export type DeleteWorkspaceCommand = {
  id: string;
};

export type DeleteWorkspaceResult = {
  id: string;
};

@Injectable()
export class DeleteWorkspaceUseCase implements UseCase<DeleteWorkspaceCommand, DeleteWorkspaceResult> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly eventEmitter: EventEmiiter,
  ) {}

  async execute(command: DeleteWorkspaceCommand): Promise<DeleteWorkspaceResult> {
    try {
      const existingWorkspace = await this.workspaceRepository.findById(command.id);

      if (!existingWorkspace) {
        throw new WorkspaceNotFoundError({});
      }

      await this.workspaceRepository.softDelete(command.id);

      const deletedAt = new Date();
      await this.eventEmitter.emit(
        new WorkspaceDeletedEvent({
          id: command.id,
          deletedAt,
        }),
      );

      return { id: command.id };
    } catch (error) {
      if (error instanceof WorkspaceNotFoundError) {
        throw error;
      }

      throw new WorkspaceDeletionFailedError({ cause: error });
    }
  }
}