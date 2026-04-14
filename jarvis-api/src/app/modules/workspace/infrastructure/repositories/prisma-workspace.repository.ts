import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../../prisma/infrastructure/prisma.repository';
import {
  WorkspaceRepository,
  CreateWorkspaceData,
  UpdateWorkspaceData,
  WorkspaceFilters,
  WorkspaceSort,
} from '../../domain/repositories/workspace.repository';
import { Workspace, WorkspaceStatus } from '../../domain/entities/workspace.entity';
import { WorkspacePersistenceError } from '../../domain/errors/workspace-persistence.error';
import { Page } from '../../../shared/domain/entities/page.entity';

@Injectable()
export class PrismaWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  async create(data: CreateWorkspaceData): Promise<Workspace> {
    try {
      const created = await this.prisma.workspace.create({
        data: {
          name: data.name,
          slug: data.slug,
          ownerId: data.ownerId,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          ownerId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return this.mapToDomain(created);
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  async findById(id: string): Promise<Workspace | null> {
    try {
      const workspace = await this.prisma.workspace.findFirst({
        where: { id, deletedAt: null },
        select: {
          id: true,
          name: true,
          slug: true,
          ownerId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return workspace ? this.mapToDomain(workspace) : null;
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  async findBySlug(slug: string): Promise<Workspace | null> {
    try {
      const workspace = await this.prisma.workspace.findFirst({
        where: { slug, deletedAt: null },
        select: {
          id: true,
          name: true,
          slug: true,
          ownerId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return workspace ? this.mapToDomain(workspace) : null;
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  async findBySlugExcludingId(slug: string, excludeId: string): Promise<Workspace | null> {
    try {
      const workspace = await this.prisma.workspace.findFirst({
        where: { slug, deletedAt: null, NOT: { id: excludeId } },
        select: {
          id: true,
          name: true,
          slug: true,
          ownerId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return workspace ? this.mapToDomain(workspace) : null;
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  async searchAll(
    page: number,
    size: number,
    filters: WorkspaceFilters,
    sort: WorkspaceSort,
  ): Promise<Page<Workspace>> {
    try {
      const searchFilter = filters.search?.trim()
        ? {
            OR: [
              { name: { contains: filters.search, mode: 'insensitive' as const } },
              { slug: { contains: filters.search, mode: 'insensitive' as const } },
            ],
          }
        : undefined;

      const where = {
        deletedAt: null,
        ...(searchFilter),
      };

      const skip = page * size;
      const orderBy = sort.field
        ? { [sort.field]: sort.order ?? 'asc' }
        : { createdAt: 'desc' as const };

      const [records, totalItems] = await Promise.all([
        this.prisma.workspace.findMany({
          where,
          skip,
          take: size,
          orderBy,
          select: {
            id: true,
            name: true,
            slug: true,
            ownerId: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        }),
        this.prisma.workspace.count({ where }),
      ]);

      const totalPages = Math.ceil(totalItems / size);

      return {
        content: records.map((record) => this.mapToDomain(record)),
        current: page,
        size,
        navigation: {
          hasNext: page + 1 < totalPages,
          hasPrevious: page > 0,
        },
        totals: {
          items: totalItems,
          pages: totalPages,
        },
      };
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  async update(id: string, data: UpdateWorkspaceData): Promise<Workspace> {
    try {
      const updated = await this.prisma.workspace.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
        },
        select: {
          id: true,
          name: true,
          slug: true,
          ownerId: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return this.mapToDomain(updated);
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      await this.prisma.workspace.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new WorkspacePersistenceError({ cause: error });
    }
  }

  private mapToDomain(prismaWorkspace: {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }): Workspace {
    return {
      id: prismaWorkspace.id,
      name: prismaWorkspace.name,
      slug: prismaWorkspace.slug,
      ownerId: prismaWorkspace.ownerId,
      status: prismaWorkspace.status as WorkspaceStatus,
      createdAt: prismaWorkspace.createdAt,
      updatedAt: prismaWorkspace.updatedAt,
      deletedAt: prismaWorkspace.deletedAt,
    };
  }
}