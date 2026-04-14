import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../domain/repositories/workspace.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { WorkspaceRetrievalFailedError } from '../../domain/errors/workspace-retrieval-failed.error';
import { WorkspaceNotFoundError } from '../../domain/errors/workspace-not-found.error';
import { Workspace } from '../../domain/entities/workspace.entity';

export type FindWorkspaceByIdCommand = {
  id: string;
};

export type FindWorkspaceByIdResult = {
  workspace: Workspace;
};

@Injectable()
export class FindWorkspaceByIdUseCase implements UseCase<FindWorkspaceByIdCommand, FindWorkspaceByIdResult> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: FindWorkspaceByIdCommand): Promise<FindWorkspaceByIdResult> {
    try {
      const workspace = await this.workspaceRepository.findById(command.id);

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