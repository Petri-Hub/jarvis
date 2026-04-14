import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkspaceController } from './presentation/rest/workspace.controller';
import { WorkspaceControllerMapper } from './presentation/rest/workspace.controller.mapper';
import { PrismaWorkspaceRepository } from './infrastructure/repositories/prisma-workspace.repository';
import { WorkspaceRepository } from './domain/repositories/workspace.repository';
import { CreateWorkspaceUseCase } from './application/use-cases/create-workspace.usecase';
import { SearchWorkspacesUseCase } from './application/use-cases/search-workspaces.usecase';
import { FindWorkspaceByIdUseCase } from './application/use-cases/find-workspace-by-id.usecase';
import { FindWorkspaceBySlugUseCase } from './application/use-cases/find-workspace-by-slug.usecase';
import { UpdateWorkspaceUseCase } from './application/use-cases/update-workspace.usecase';
import { DeleteWorkspaceUseCase } from './application/use-cases/delete-workspace.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [
    {
      provide: WorkspaceRepository,
      useClass: PrismaWorkspaceRepository,
    },
    CreateWorkspaceUseCase,
    SearchWorkspacesUseCase,
    FindWorkspaceByIdUseCase,
    FindWorkspaceBySlugUseCase,
    UpdateWorkspaceUseCase,
    DeleteWorkspaceUseCase,
    WorkspaceControllerMapper,
  ],
})
export class WorkspaceModule {}