import { Workspace } from '../entities/workspace.entity';
import { Page } from '../../../shared/domain/entities/page.entity';

export abstract class WorkspaceRepository {
  abstract create(data: CreateWorkspaceData): Promise<Workspace>;
  abstract findById(id: string): Promise<Workspace | null>;
  abstract findBySlug(slug: string): Promise<Workspace | null>;
  abstract findBySlugExcludingId(slug: string, excludeId: string): Promise<Workspace | null>;
  abstract searchAll(
    page: number,
    size: number,
    filters: WorkspaceFilters,
    sort: WorkspaceSort,
  ): Promise<Page<Workspace>>;
  abstract update(id: string, data: UpdateWorkspaceData): Promise<Workspace>;
  abstract softDelete(id: string): Promise<void>;
}

export type CreateWorkspaceData = {
  name: string;
  slug: string;
  ownerId: string;
};

export type UpdateWorkspaceData = {
  name?: string;
};

export type WorkspaceFilters = Partial<{
  search: string;
}>;

export type WorkspaceSortField = 'name' | 'createdAt';
export type WorkspaceSortOrder = 'asc' | 'desc';

export type WorkspaceSort = Partial<{
  field: WorkspaceSortField;
  order: WorkspaceSortOrder;
}>;