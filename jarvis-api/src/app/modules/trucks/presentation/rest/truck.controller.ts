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
import { CreateTruckUseCase } from '../../application/use-cases/create-truck.usecase';
import { SearchTrucksUseCase } from '../../application/use-cases/search-trucks.usecase';
import { FindTruckByIdUseCase } from '../../application/use-cases/find-truck-by-id.usecase';
import { UpdateTruckUseCase } from '../../application/use-cases/update-truck.usecase';
import { DeleteTruckUseCase } from '../../application/use-cases/delete-truck.usecase';
import {
  CreateTruckDTO,
  UpdateTruckDTO,
  TruckResponseDTO,
  TruckListResponseDTO,
} from './truck.controller.dto';
import { TruckControllerMapper } from './truck.controller.mapper';
import { ErrorResponseDto } from '../../../shared/presentation/rest/dtos/error-response.dto';
import type { TruckSortField, TruckSortOrder } from '../../domain/entities/truck-sort.entity';

@ApiTags('trucks')
@Controller('trucks')
export class TruckController {
  constructor(
    private readonly createTruckUseCase: CreateTruckUseCase,
    private readonly searchTrucksUseCase: SearchTrucksUseCase,
    private readonly findTruckByIdUseCase: FindTruckByIdUseCase,
    private readonly updateTruckUseCase: UpdateTruckUseCase,
    private readonly deleteTruckUseCase: DeleteTruckUseCase,
    private readonly mapper: TruckControllerMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new truck',
    description: 'Registers a new truck in the system. The license plate must be unique.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Truck created successfully',
    type: TruckResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or truck with license plate already exists',
    type: ErrorResponseDto,
  })
  async create(@Body() dto: CreateTruckDTO): Promise<TruckResponseDTO> {
    const result = await this.createTruckUseCase.execute(dto);
    const response = this.mapper.toResponseDTO(result.truck);
    return response;
  }

  @Get()
  @ApiOperation({
    summary: 'Search trucks',
    description:
      'Returns a paginated list of trucks with optional free-text filtering and sorting.',
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
    example: 'Volvo',
    description: 'Free-text search across license plate, brand and model',
  })
  @ApiQuery({
    name: 'sort-by',
    required: false,
    enum: ['licensePlate', 'brand', 'model', 'year', 'createdAt'],
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
    description: 'Paginated list of trucks',
    type: TruckListResponseDTO,
  })
  async search(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('sort-by') sortField?: TruckSortField,
    @Query('sort-order') sortOrder?: TruckSortOrder,
  ): Promise<TruckListResponseDTO> {
    const command = this.mapper.toSearchCommand(page, size, search, sortField, sortOrder);
    const result = await this.searchTrucksUseCase.execute(command);
    const response = this.mapper.toListResponseDTO(result);
    return response;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get truck by ID',
    description: 'Returns the details of a specific truck identified by its numeric ID.',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Truck ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Truck found',
    type: TruckResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Truck not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TruckResponseDTO> {
    const result = await this.findTruckByIdUseCase.execute({ id });
    const response = this.mapper.toResponseDTO(result.truck);
    return response;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update truck by ID',
    description:
      'Updates one or more fields of an existing truck. If the license plate is changed, it must not already be in use by another truck.',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Truck ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Truck updated successfully',
    type: TruckResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Truck not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or license plate already exists',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTruckDTO,
  ): Promise<TruckResponseDTO> {
    const result = await this.updateTruckUseCase.execute({ id, ...dto });
    const response = this.mapper.toResponseDTO(result.truck);
    return response;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete truck by ID',
    description: 'Permanently removes a truck from the system by its numeric ID.',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Truck ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Truck deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Truck not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteTruckUseCase.execute({ id });
  }
}
