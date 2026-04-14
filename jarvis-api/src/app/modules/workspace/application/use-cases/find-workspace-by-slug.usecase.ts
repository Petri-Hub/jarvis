import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../domain/repositories/workspace.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { WorkspaceRetrievalFailedError } from '../../domain/errors/workspace-retrieval-failed.error';
import { WorkspaceNotFoundError } from '../../domain/errors/workspace-not-found.error';
import { Workspace } from '../../domain/entities/workspace.entity';

export type FindWorkspaceBySlugCommand = {
  slug: string;
};

export type FindWorkspaceBySlugResult = {
  workspace: Workspace;
};

@Injectable()
export class FindWorkspaceBySlugUseCase implements UseCase<FindWorkspaceBySlugCommand, FindWorkspaceBySlugResult> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: FindWorkspaceBySlugCommand): Promise<FindWorkspaceBySlugResult> {
    try {
      const workspace = await this.workspaceRepository.findBySlug(command.slug);

      if (!workspace) {
        throw new WorkspaceNotFoundError({});
      }

      return { workspace };
    } catch (error) {
      if (error instanceof WorkspaceNotFoundError) {
        throw error;
      }

      throw new WorkspaceRetrievalFailedError({ cause: error });
    }
  }
}