import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TruckCreatedEvent } from '../../../trucks/domain/events/truck-created.event';
import { TruckUpdatedEvent } from '../../../trucks/domain/events/truck-updated.event';
import { TruckDeletedEvent } from '../../../trucks/domain/events/truck-deleted.event';
import { EventTypes } from '../../../shared/domain/constants/events.constants';
import { SendAdminEmailUseCase } from '../../application/use-cases/send-admin-email/send-admin-email.usecase';

@Injectable()
export class TruckEventsHandler {
  constructor(private readonly sendAdminEmailUseCase: SendAdminEmailUseCase) {}

  @OnEvent(EventTypes.TRUCK_CREATED)
  async handleTruckCreated(event: TruckCreatedEvent): Promise<void> {
    await this.sendAdminEmailUseCase.execute({
      subject: 'New Truck Created',
      body: `A new truck has been created:\nLicense Plate: ${event.payload.licensePlate}\nBrand: ${event.payload.brand}\nModel: ${event.payload.model}\nYear: ${event.payload.year}`,
    });
  }

  @OnEvent(EventTypes.TRUCK_UPDATED)
  async handleTruckUpdated(event: TruckUpdatedEvent): Promise<void> {
    await this.sendAdminEmailUseCase.execute({
      subject: 'Truck Updated',
      body: `A truck has been updated:\nLicense Plate: ${event.payload.licensePlate}\nBrand: ${event.payload.brand}\nModel: ${event.payload.model}\nYear: ${event.payload.year}`,
    });
  }

  @OnEvent(EventTypes.TRUCK_DELETED)
  async handleTruckDeleted(event: TruckDeletedEvent): Promise<void> {
    await this.sendAdminEmailUseCase.execute({
      subject: 'Truck Deleted',
      body: `A truck has been deleted:\nLicense Plate: ${event.payload.licensePlate}\nID: ${event.payload.id}`,
    });
  }
}
