import { Injectable } from '@nestjs/common';
import { Truck } from '../../domain/entities/truck.entity';
import type { TruckSortField, TruckSortOrder } from '../../domain/entities/truck-sort.entity';
import { SearchTrucksCommand, SearchTrucksResult } from '../../application/use-cases/search-trucks.usecase';
import { TruckResponseDTO, TruckListResponseDTO } from './truck.controller.dto';

@Injectable()
export class TruckControllerMapper {
  toResponseDTO(truck: Truck): TruckResponseDTO {
    return {
      licensePlate: truck.licensePlate,
      brand: truck.brand,
      model: truck.model,
      year: truck.year,
    };
  }

  toResponseDTOList(trucks: Truck[]): TruckResponseDTO[] {
    return trucks.map((truck) => this.toResponseDTO(truck));
  }

  toSearchCommand(
    page: number,
    size: number,
    search: string | undefined,
    field: TruckSortField | undefined,
    order: TruckSortOrder | undefined,
  ): SearchTrucksCommand {
    return {
      page,
      size,
      filters: { search },
      sort: { field, order },
    };
  }

  toListResponseDTO(result: SearchTrucksResult): TruckListResponseDTO {
    return {
      trucks: result.page.content.map((truck) => this.toResponseDTO(truck)),
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
}
