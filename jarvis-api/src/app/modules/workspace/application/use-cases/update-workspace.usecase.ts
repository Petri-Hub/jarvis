import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../domain/repositories/workspace.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { WorkspaceUpdateFailedError } from '../../domain/errors/workspace-update-failed.error';
import { WorkspaceNotFoundError } from '../../domain/errors/workspace-not-found.error';
import { WorkspaceSlugAlreadyExistsError } from '../../domain/errors/workspace-slug-already-exists.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { WorkspaceUpdatedEvent } from '../../domain/events/workspace-updated.event';
import { Workspace } from '../../domain/entities/workspace.entity';

export type UpdateWorkspaceCommand = {
  id: string;
  name: string;
};

export type UpdateWorkspaceResult = {
  workspace: Workspace;
};

@Injectable()
export class UpdateWorkspaceUseCase implements UseCase<UpdateWorkspaceCommand, UpdateWorkspaceResult> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly eventEmitter: EventEmiiter,
  ) {}

  async execute(command: UpdateWorkspaceCommand): Promise<UpdateWorkspaceResult> {
    try {
      const existingWorkspace = await this.workspaceRepository.findById(command.id);

      if (!existingWorkspace) {
        throw new WorkspaceNotFoundError({});
      }

      if (command.name && command.name !== existingWorkspace.name) {
        const slug = this.generateSlug(command.name);

        if (await this.isSlugAlreadyInUse(slug, command.id)) {
          throw new WorkspaceSlugAlreadyExistsError({});
        }
      }

      const workspace = await this.workspaceRepository.update(command.id, {
        name: command.name,
      });

      await this.eventEmitter.emit(
        new WorkspaceUpdatedEvent({
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
          ownerId: workspace.ownerId,
          status: workspace.status,
          updatedAt: workspace.updatedAt,
        }),
      );

      return { workspace };
    } catch (error) {
      if (error instanceof WorkspaceNotFoundError || error instanceof WorkspaceSlugAlreadyExistsError) {
        throw error;
      }

      throw new WorkspaceUpdateFailedError({ cause: error });
    }
  }

  private async isSlugAlreadyInUse(slug: string, excludeId: string): Promise<boolean> {
    const existingWorkspace = await this.workspaceRepository.findBySlugExcludingId(slug, excludeId);
    return !!existingWorkspace;
  }

  private generateSlug(name: string): string {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    return baseSlug;
  }
}