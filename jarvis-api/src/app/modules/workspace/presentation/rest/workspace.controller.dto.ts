import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/presentation/rest/dtos/pagination.dto';

export class CreateWorkspaceDTO {
  @ApiProperty({ example: 'My Workspace', description: 'Workspace name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user-123', description: 'Owner user ID' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

export class UpdateWorkspaceDTO {
  @ApiProperty({ example: 'My Updated Workspace', description: 'Workspace name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class WorkspaceResponseDTO {
  @ApiProperty({ example: 'abc123def-4567', description: 'Workspace ID' })
  id: string;

  @ApiProperty({ example: 'My Workspace', description: 'Workspace name' })
  name: string;

  @ApiProperty({ example: 'my-workspace', description: 'Workspace slug' })
  slug: string;

  @ApiProperty({ example: 'user-123', description: 'Owner user ID' })
  ownerId: string;

  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], example: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z', description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z', description: 'Last update timestamp' })
  updatedAt: Date;
}

export class WorkspaceListResponseDTO {
  @ApiProperty({ type: [WorkspaceResponseDTO] })
  workspaces: WorkspaceResponseDTO[];

  @ApiProperty({ type: PaginationDTO })
  pagination: PaginationDTO;
}