import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../domain/repositories/workspace.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { WorkspaceCreationFailedError } from '../../domain/errors/workspace-creation-failed.error';
import { WorkspaceSlugAlreadyExistsError } from '../../domain/errors/workspace-slug-already-exists.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { WorkspaceCreatedEvent } from '../../domain/events/workspace-created.event';
import { Workspace } from '../../domain/entities/workspace.entity';

export type CreateWorkspaceCommand = {
  name: string;
  ownerId: string;
};

export type CreateWorkspaceResult = {
  workspace: Workspace;
};

@Injectable()
export class CreateWorkspaceUseCase implements UseCase<CreateWorkspaceCommand, CreateWorkspaceResult> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly eventEmitter: EventEmiiter,
  ) {}

  async execute(command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> {
    try {
      const slug = this.generateSlug(command.name);
      
      if (await this.isSlugAlreadyInUse(slug)) {
        throw new WorkspaceSlugAlreadyExistsError({});
      }

      const workspace = await this.workspaceRepository.create({
        name: command.name,
        slug,
        ownerId: command.ownerId,
      });

      await this.eventEmitter.emit(
        new WorkspaceCreatedEvent({
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
          ownerId: workspace.ownerId,
          status: workspace.status,
          createdAt: workspace.createdAt,
          updatedAt: workspace.updatedAt,
        }),
      );

      return { workspace };
    } catch (error) {
      if (error instanceof WorkspaceSlugAlreadyExistsError) {
        throw error;
      }

      throw new WorkspaceCreationFailedError({ cause: error });
    }
  }

  private async isSlugAlreadyInUse(slug: string): Promise<boolean> {
    const existingWorkspace = await this.workspaceRepository.findBySlug(slug);
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