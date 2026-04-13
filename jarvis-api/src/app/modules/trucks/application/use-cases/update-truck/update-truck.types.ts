import { Truck } from '../../../domain/entities/truck.entity';

export type UpdateTruckCommand = {
  id: number;
  licensePlate?: string;
  brand?: string;
  model?: string;
  year?: number;
};

export type UpdateTruckResult = {
  truck: Truck;
};
