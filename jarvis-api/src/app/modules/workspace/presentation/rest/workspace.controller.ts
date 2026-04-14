import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateWorkspaceUseCase } from '../../application/use-cases/create-workspace.usecase';
import { SearchWorkspacesUseCase } from '../../application/use-cases/search-workspaces.usecase';
import { FindWorkspaceByIdUseCase } from '../../application/use-cases/find-workspace-by-id.usecase';
import { FindWorkspaceBySlugUseCase } from '../../application/use-cases/find-workspace-by-slug.usecase';
import { UpdateWorkspaceUseCase } from '../../application/use-cases/update-workspace.usecase';
import { DeleteWorkspaceUseCase } from '../../application/use-cases/delete-workspace.usecase';
import {
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO,
  WorkspaceResponseDTO,
  WorkspaceListResponseDTO,
} from './workspace.controller.dto';
import { WorkspaceControllerMapper } from './workspace.controller.mapper';
import { ErrorResponseDto } from '../../../shared/presentation/rest/dtos/error-response.dto';
import type { WorkspaceSortField, WorkspaceSortOrder } from '../../domain/repositories/workspace.repository';

@ApiTags('workspaces')
@Controller('workspaces')
export class WorkspaceController {
  constructor(
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
    private readonly searchWorkspacesUseCase: SearchWorkspacesUseCase,
    private readonly findWorkspaceByIdUseCase: FindWorkspaceByIdUseCase,
    private readonly findWorkspaceBySlugUseCase: FindWorkspaceBySlugUseCase,
    private readonly updateWorkspaceUseCase: UpdateWorkspaceUseCase,
    private readonly deleteWorkspaceUseCase: DeleteWorkspaceUseCase,
    private readonly mapper: WorkspaceControllerMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new workspace',
    description: 'Creates a new workspace with auto-generated slug from name.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Workspace created successfully',
    type: WorkspaceResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or workspace with slug already exists',
    type: ErrorResponseDto,
  })
  async create(@Body() dto: CreateWorkspaceDTO): Promise<WorkspaceResponseDTO> {
    const result = await this.createWorkspaceUseCase.execute(dto);
    const response = this.mapper.toResponseDTO(result.workspace);
    return response;
  }

  @Get()
  @ApiOperation({
    summary: 'Search workspaces',
    description:
      'Returns a paginated list of workspaces with optional free-text filtering and sorting.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 0,
    description: 'Zero-based page index',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    example: 20,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'my',
    description: 'Free-text search across name and slug',
  })
  @ApiQuery({
    name: 'sort-by',
    required: false,
    enum: ['name', 'createdAt'],
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sort-order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort direction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of workspaces',
    type: WorkspaceListResponseDTO,
  })
  async search(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('sort-by') sortField?: WorkspaceSortField,
    @Query('sort-order') sortOrder?: WorkspaceSortOrder,
  ): Promise<WorkspaceListResponseDTO> {
    const command = this.mapper.toSearchCommand(page, size, search, sortField, sortOrder);
    const result = await this.searchWorkspacesUseCase.execute(command);
    const response = this.mapper.toListResponseDTO(result);
    return response;
  }

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Get workspace by slug',
    description: 'Returns the details of a specific workspace identified by its slug.',
  })
  @ApiParam({ name: 'slug', type: 'string', description: 'Workspace slug' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Workspace found',
    type: WorkspaceResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workspace not found',
  })
  async findBySlug(@Param('slug') slug: string): Promise<WorkspaceResponseDTO> {
    const result = await this.findWorkspaceBySlugUseCase.execute({ slug });
    const response = this.mapper.toResponseDTO(result.workspace);
    return response;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get workspace by ID',
    description: 'Returns the details of a specific workspace identified by its ID.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Workspace ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Workspace found',
    type: WorkspaceResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workspace not found',
  })
  async findOne(@Param('id') id: string): Promise<WorkspaceResponseDTO> {
    const result = await this.findWorkspaceByIdUseCase.execute({ id });
    const response = this.mapper.toResponseDTO(result.workspace);
    return response;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update workspace by ID',
    description:
      'Updates the name of an existing workspace. If the name is changed, a new slug will be auto-generated.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Workspace ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Workspace updated successfully',
    type: WorkspaceResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workspace not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or slug already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkspaceDTO,
  ): Promise<WorkspaceResponseDTO> {
    const result = await this.updateWorkspaceUseCase.execute({ id, ...dto });
    const response = this.mapper.toResponseDTO(result.workspace);
    return response;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete workspace by ID',
    description: 'Soft deletes a workspace from the system by its ID.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Workspace ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Workspace deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workspace not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteWorkspaceUseCase.execute({ id });
  }
}