import { Injectable } from '@nestjs/common';
import { TruckRepository } from '../../../domain/repositories/truck.repository';
import { CreateTruckCommand, CreateTruckResult } from './create-truck.types';
import { UseCase } from '../../../../shared/application/usecases/base.usecase';
import { TruckCreationFailedError } from '../../../domain/errors/truck-creation-failed.error';
import { TruckAlreadyExistsError } from '../../../domain/errors/truck-already-exists.error';
import { EventEmiiter } from '../../../../shared/domain/services/event-emitter.service';
import { TruckCreatedEvent } from '../../../domain/events/truck-created.event';

@Injectable()
export class CreateTruckUseCase implements UseCase<CreateTruckCommand, CreateTruckResult> {
  constructor(
    private readonly truckRepository: TruckRepository,
    private readonly eventEmitter: EventEmiiter,
  ) {}

  async execute(input: CreateTruckCommand): Promise<CreateTruckResult> {
    try {
      const existingTruck = await this.truckRepository.findByLicensePlate(input.licensePlate);

      if (existingTruck) {
        throw new TruckAlreadyExistsError({});
      }

      const truck = await this.truckRepository.create({
        licensePlate: input.licensePlate,
        brand: input.brand,
        model: input.model,
        year: input.year,
      });

      await this.eventEmitter.emit(
        new TruckCreatedEvent({
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
      if (error instanceof TruckAlreadyExistsError) {
        throw error;
      }

      throw new TruckCreationFailedError({ cause: error });
    }
  }
}
