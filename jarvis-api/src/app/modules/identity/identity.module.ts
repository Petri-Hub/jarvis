import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { IdentityController } from './presentation/rest/identity.controller';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { IdentityControllerMapper } from './presentation/rest/identity.controller.mapper';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any => {
        return {
          secret: configService.get<string>('JWT_SECRET', 'dev-secret-key'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION', '1h'),
          },
        };
      },
    }),
  ],
  controllers: [IdentityController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    SignUpUseCase,
    SignInUseCase,
    IdentityControllerMapper,
  ],
})
export class IdentityModule {}