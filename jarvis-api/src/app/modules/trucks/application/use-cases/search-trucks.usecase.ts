import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { TruckRepository } from '../../domain/repositories/truck.repository';
import { TruckListingFailedError } from '../../domain/errors/truck-listing-failed.error';
import { Page } from '../../../shared/domain/entities/page.entity';
import { OffsetPaginatedCommand } from '../../../shared/application/usecases/paginated.command';
import { Truck } from '../../domain/entities/truck.entity';
import { TruckFilters } from '../../domain/entities/truck-filters.entity';
import { TruckSort } from '../../domain/entities/truck-sort.entity';

export type SearchTrucksCommand = OffsetPaginatedCommand & {
  filters: TruckFilters;
  sort: TruckSort;
};

export type SearchTrucksResult = {
  page: Page<Truck>;
};

@Injectable()
export class SearchTrucksUseCase implements UseCase<SearchTrucksCommand, SearchTrucksResult> {
  constructor(private readonly truckRepository: TruckRepository) {}

  async execute(command: SearchTrucksCommand): Promise<SearchTrucksResult> {
    try {
      const page = await this.truckRepository.searchAll(
        command.page,
        command.size,
        command.filters,
        command.sort,
      );
      return { page };
    } catch (error) {
      throw new TruckListingFailedError({ cause: error });
    }
  }
}
