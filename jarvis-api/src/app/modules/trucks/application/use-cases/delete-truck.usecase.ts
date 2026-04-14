import { Injectable } from '@nestjs/common';
import { TruckRepository } from '../../domain/repositories/truck.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { TruckDeletionFailedError } from '../../domain/errors/truck-deletion-failed.error';
import { TruckNotFoundError } from '../../domain/errors/truck-not-found.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { TruckDeletedEvent } from '../../domain/events/truck-deleted.event';

export type DeleteTruckCommand = {
  id: number;
};

@Injectable()
export class DeleteTruckUseCase implements UseCase<DeleteTruckCommand, void> {
  constructor(
    private readonly truckRepository: TruckRepository,
    private readonly eventEmitter: EventEmiiter,
  ) {}

  async execute(command: DeleteTruckCommand): Promise<void> {
    try {
      const truck = await this.truckRepository.findById(command.id);

      if (!truck) {
        throw new TruckNotFoundError({ metadata: { id: command.id } });
      }

      await this.truckRepository.delete(command.id);

      await this.eventEmitter.emit(
        new TruckDeletedEvent({
          id: truck.id,
          licensePlate: truck.licensePlate,
        }),
      );
    } catch (error) {
      if (error instanceof TruckNotFoundError) {
        throw error;
      }

      throw new TruckDeletionFailedError({ cause: error });
    }
  }
}
