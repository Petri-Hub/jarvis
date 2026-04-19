import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EventEmiiter as EventEmitter } from './domain/services/event-emitter.service';
import { NestEventEmitterService } from './infrastructure/services/nest-event-emitter.service';
import { NestErrorFactoryService } from './infrastructure/services/nest-error-factory.service';
import { JwtAuthGuard } from './presentation/rest/guards/jwt-auth.guard';
import { JwtStrategy } from './presentation/rest/guards/jwt.strategy';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [],
  providers: [
    {
      provide: EventEmitter,
      useClass: NestEventEmitterService,
    },
    NestErrorFactoryService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [
    EventEmitter,
    NestErrorFactoryService,
    JwtAuthGuard,
    PassportModule,
  ],
})
export class SharedModule {}