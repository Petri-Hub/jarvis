import { Page } from '../../../shared/domain/entities/page.entity';
import { Truck } from '../entities/truck.entity';
import { TruckFilters } from '../entities/truck-filters.entity';
import { TruckSort } from '../entities/truck-sort.entity';

export abstract class TruckRepository {
  abstract create(data: CreateTruckData): Promise<Truck>;
  abstract searchAll(
    page: number,
    size: number,
    filters: TruckFilters,
    sort: TruckSort,
  ): Promise<Page<Truck>>;
  abstract findById(id: number): Promise<Truck | null>;
  abstract findByLicensePlate(licensePlate: string): Promise<Truck | null>;
  abstract update(id: number, data: UpdateTruckData): Promise<Truck>;
  abstract delete(id: number): Promise<void>;
}

export type CreateTruckData = {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
};

export type UpdateTruckData = {
  licensePlate?: string;
  brand?: string;
  model?: string;
  year?: number;
};
