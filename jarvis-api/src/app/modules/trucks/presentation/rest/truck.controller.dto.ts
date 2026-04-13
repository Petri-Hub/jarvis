import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/presentation/rest/dtos/pagination.dto';

export class CreateTruckDTO {
  @ApiProperty({ example: 'ABC-1234', description: 'License plate of the truck' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 'Volvo', description: 'Brand of the truck' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'FH16', description: 'Model of the truck' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2020, description: 'Year of manufacture', minimum: 1900, maximum: 2100 })
  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number;
}

export class UpdateTruckDTO extends PartialType(CreateTruckDTO) {}

export class TruckResponseDTO {
  @ApiProperty({ example: 'ABC-1234', description: 'License plate of the truck' })
  licensePlate: string;

  @ApiProperty({ example: 'Volvo', description: 'Brand of the truck' })
  brand: string;

  @ApiProperty({ example: 'FH16', description: 'Model of the truck' })
  model: string;

  @ApiProperty({ example: 2020, description: 'Year of manufacture' })
  year: number;
}

export class TruckListResponseDTO {
  @ApiProperty({ type: [TruckResponseDTO] })
  trucks: TruckResponseDTO[];

  @ApiProperty({ type: PaginationDTO })
  pagination: PaginationDTO;
}
