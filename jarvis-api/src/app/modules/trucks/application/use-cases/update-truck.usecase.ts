import { Injectable } from '@nestjs/common';
import { TruckRepository } from '../../domain/repositories/truck.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { TruckUpdateFailedError } from '../../domain/errors/truck-update-failed.error';
import { TruckNotFoundError } from '../../domain/errors/truck-not-found.error';
import { TruckAlreadyExistsError } from '../../domain/errors/truck-already-exists.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { TruckUpdatedEvent } from '../../domain/events/truck-updated.event';
import { Truck } from '../../domain/entities/truck.entity';

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

@Injectable()
export class UpdateTruckUseCase implements UseCase<UpdateTruckCommand, UpdateTruckResult> {
  constructor(
    private readonly truckRepository: TruckRepository,
    private readonly eventEmitter: EventEmiiter,
  ) {}

  async execute(command: UpdateTruckCommand): Promise<UpdateTruckResult> {
    try {
      const existingTruck = await this.truckRepository.findById(command.id);

      if (!existingTruck) {
        throw new TruckNotFoundError({ metadata: { id: command.id } });
      }

      if (command.licensePlate && command.licensePlate !== existingTruck.licensePlate) {
        const truckWithLicensePlate = await this.truckRepository.findByLicensePlate(
          command.licensePlate,
        );

        if (truckWithLicensePlate) {
          throw new TruckAlreadyExistsError({ metadata: { licensePlate: command.licensePlate } });
        }
      }

      const truck = await this.truckRepository.update(command.id, {
        licensePlate: command.licensePlate,
        brand: command.brand,
        model: command.model,
        year: command.year,
      });

      await this.eventEmitter.emit(
        new TruckUpdatedEvent({
          id: truck.id,
          licensePlate: truck.licensePlate,
          brand: truck.brand,
          model: truck.model,
          year: truck.year,
          createdAt: truck.createdAt,
          updatedAt: truck.updatedAt,
        }),
      );

      return { truck };
    } catch (error) {
      if (error instanceof TruckNotFoundError || error instanceof TruckAlreadyExistsError) {
        throw error;
      }

      throw new TruckUpdateFailedError({ cause: error });
    }
  }
}
