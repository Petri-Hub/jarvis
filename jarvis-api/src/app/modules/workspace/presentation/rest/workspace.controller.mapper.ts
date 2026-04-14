import { Injectable } from '@nestjs/common';
import { Workspace } from '../../domain/entities/workspace.entity';
import type { WorkspaceSortField, WorkspaceSortOrder } from '../../domain/repositories/workspace.repository';
import { SearchWorkspacesCommand, SearchWorkspacesResult } from '../../application/use-cases/search-workspaces.usecase';
import { WorkspaceResponseDTO, WorkspaceListResponseDTO } from './workspace.controller.dto';

@Injectable()
export class WorkspaceControllerMapper {
  toResponseDTO(workspace: Workspace): WorkspaceResponseDTO {
    return {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      ownerId: workspace.ownerId,
      status: workspace.status,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
    };
  }

  toResponseDTOList(workspaces: Workspace[]): WorkspaceResponseDTO[] {
    return workspaces.map((workspace) => this.toResponseDTO(workspace));
  }

  toSearchCommand(
    page: number,
    size: number,
    search: string | undefined,
    field: WorkspaceSortField | undefined,
    order: WorkspaceSortOrder | undefined,
  ): SearchWorkspacesCommand {
    return {
      page,
      size,
      filters: { search },
      sort: { field, order },
    };
  }

  toListResponseDTO(result: SearchWorkspacesResult): WorkspaceListResponseDTO {
    return {
      workspaces: result.page.content.map((workspace) => this.toResponseDTO(workspace)),
      pagination: {
        page: result.page.current,
        size: result.page.size,
        navigation: {
          hasNext: result.page.navigation.hasNext,
          hasPrevious: result.page.navigation.hasPrevious,
        },
        totals: {
          items: result.page.totals.items,
          pages: result.page.totals.pages,
        },
      },
    };
  }

  toCreateCommand(name: string, ownerId: string): { name: string; ownerId: string } {
    return { name, ownerId };
  }

  toUpdateCommand(id: string, name: string): { id: string; name: string } {
    return { id, name };
  }
}