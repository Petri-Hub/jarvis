import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TrucksModule } from './modules/trucks/trucks.module';
import { IdentityModule } from './modules/identity/identity.module';
import { SharedModule } from './modules/shared/shared.module';
import { NotificationModule } from './modules/notification/notification.module';
import { LoggingModule } from './modules/logging/logging.module';
import { HealthModule } from './modules/health/health.module';
import { MailModule } from './modules/mail/mail.module';
import { GlobalExceptionFilter } from './modules/shared/presentation/rest/filters/global-exception.filter';
import { DomainExceptionFilter } from './modules/shared/presentation/rest/filters/domain-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_FILE || '.env',
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    TrucksModule,
    IdentityModule,
    SharedModule,
    NotificationModule,
    LoggingModule,
    HealthModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
