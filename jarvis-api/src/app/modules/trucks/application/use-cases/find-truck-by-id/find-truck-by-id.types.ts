import { Truck } from '../../../domain/entities/truck.entity';

export type FindTruckByIdCommand = {
  id: number;
};

export type FindTruckByIdResult = {
  truck: Truck;
};
