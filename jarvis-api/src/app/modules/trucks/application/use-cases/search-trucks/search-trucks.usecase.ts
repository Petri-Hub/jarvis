import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/application/usecases/base.usecase';
import { TruckRepository } from '../../../domain/repositories/truck.repository';
import { TruckListingFailedError } from '../../../domain/errors/truck-listing-failed.error';
import { SearchTrucksCommand, SearchTrucksResult } from './search-trucks.types';

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
