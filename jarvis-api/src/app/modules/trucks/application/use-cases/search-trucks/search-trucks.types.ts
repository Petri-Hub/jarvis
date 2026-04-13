import { Page } from '../../../../shared/domain/entities/page.entity';
import { OffsetPaginatedCommand } from '../../../../shared/application/usecases/paginated.command';
import { Truck } from '../../../domain/entities/truck.entity';
import { TruckFilters } from '../../../domain/entities/truck-filters.entity';
import { TruckSort } from '../../../domain/entities/truck-sort.entity';

export type SearchTrucksCommand = OffsetPaginatedCommand & {
  filters: TruckFilters;
  sort: TruckSort;
};

export type SearchTrucksResult = {
  page: Page<Truck>;
};
