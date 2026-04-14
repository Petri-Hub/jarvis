import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { WorkspaceRepository } from '../../domain/repositories/workspace.repository';
import { WorkspaceListingFailedError } from '../../domain/errors/workspace-listing-failed.error';
import { Page } from '../../../shared/domain/entities/page.entity';
import { OffsetPaginatedCommand } from '../../../shared/application/usecases/paginated.command';
import { Workspace } from '../../domain/entities/workspace.entity';
import { WorkspaceFilters, WorkspaceSort } from '../../domain/repositories/workspace.repository';

export type SearchWorkspacesCommand = OffsetPaginatedCommand & {
  filters: WorkspaceFilters;
  sort: WorkspaceSort;
};

export type SearchWorkspacesResult = {
  page: Page<Workspace>;
};

@Injectable()
export class SearchWorkspacesUseCase implements UseCase<SearchWorkspacesCommand, SearchWorkspacesResult> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: SearchWorkspacesCommand): Promise<SearchWorkspacesResult> {
    try {
      const page = await this.workspaceRepository.searchAll(
        command.page,
        command.size,
        command.filters,
        command.sort,
      );
      return { page };
    } catch (error) {
      throw new WorkspaceListingFailedError({ cause: error });
    }
  }
}