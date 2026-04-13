import { CreateTruckUseCase } from './create-truck.usecase';
import { TruckRepository } from '../../../domain/repositories/truck.repository';
import { EventEmiiter } from '../../../../shared/domain/services/event-emitter.service';
import { CreateTruckCommand } from './create-truck.types';
import { Truck } from '../../../domain/entities/truck.entity';
import { TruckCreatedEvent } from '../../../domain/events/truck-created.event';

describe('CreateTruckUseCase', () => {
  let useCase: CreateTruckUseCase;
  let truckRepository: jest.Mocked<TruckRepository>;
  let eventEmitter: jest.Mocked<EventEmiiter>;

  beforeEach(() => {
    truckRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByLicensePlate: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TruckRepository>;

    eventEmitter = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<EventEmiiter>;

    useCase = new CreateTruckUseCase(truckRepository, eventEmitter);
  });

  describe('execute', () => {
    it('should create a truck successfully', async () => {
      const command: CreateTruckCommand = {
        licensePlate: 'ABC-1234',
        brand: 'Volvo',
        model: 'FH16',
        year: 2023,
      };

      const createdTruck: Truck = {
        id: 1,
        licensePlate: 'ABC-1234',
        brand: 'Volvo',
        model: 'FH16',
        year: 2023,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-01T00:00:00.000Z'),
      };

      truckRepository.findByLicensePlate.mockResolvedValue(null);
      truckRepository.create.mockResolvedValue(createdTruck);
      eventEmitter.emit.mockResolvedValue(undefined);

      const result = await useCase.execute(command);

      expect(truckRepository.findByLicensePlate).toHaveBeenCalledWith('ABC-1234');
      expect(truckRepository.create).toHaveBeenCalledWith({
        licensePlate: 'ABC-1234',
        brand: 'Volvo',
        model: 'FH16',
        year: 2023,
      });
      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
      const emittedEvent = eventEmitter.emit.mock.calls[0][0] as TruckCreatedEvent;
      expect(emittedEvent).toBeInstanceOf(TruckCreatedEvent);
      expect(emittedEvent.payload).toEqual({
        id: 1,
        licensePlate: 'ABC-1234',
        brand: 'Volvo',
        model: 'FH16',
        year: 2023,
        createdAt: createdTruck.createdAt,
        updatedAt: createdTruck.updatedAt,
      });
      expect(result.truck).toEqual(createdTruck);
    });
  });
});
