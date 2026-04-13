import { Truck } from '../../../domain/entities/truck.entity';

export type CreateTruckCommand = {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
};

export type CreateTruckResult = {
  truck: Truck;
};
