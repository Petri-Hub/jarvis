import { Injectable } from '@nestjs/common';
import { TruckRepository } from '../../../domain/repositories/truck.repository';
import { FindTruckByIdCommand, FindTruckByIdResult } from './find-truck-by-id.types';
import { UseCase } from '../../../../shared/application/usecases/base.usecase';
import { TruckRetrievalFailedError } from '../../../domain/errors/truck-retrieval-failed.error';
import { TruckNotFoundError } from '../../../domain/errors/truck-not-found.error';

@Injectable()
export class FindTruckByIdUseCase implements UseCase<FindTruckByIdCommand, FindTruckByIdResult> {
  constructor(private readonly truckRepository: TruckRepository) {}

  async execute(command: FindTruckByIdCommand): Promise<FindTruckByIdResult> {
    try {
      const truck = await this.truckRepository.findById(command.id);

      if (!truck) {
        throw new TruckNotFoundError();
      }

      return { truck };
    } catch (error) {
      if (error instanceof TruckNotFoundError) {
        throw error;
      }

      throw new TruckRetrievalFailedError({ cause: error });
    }
  }
}
