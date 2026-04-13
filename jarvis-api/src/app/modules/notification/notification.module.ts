import { Module } from '@nestjs/common';
import { TruckEventsHandler } from './presentation/handlers/truck-events.handler';
import { SendAdminEmailUseCase } from './application/use-cases/send-admin-email/send-admin-email.usecase';

@Module({
  imports: [],
  controllers: [],
  providers: [TruckEventsHandler, SendAdminEmailUseCase],
})
export class NotificationModule {}
