import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import { UserPersistenceError } from '../../domain/errors/user-persistence.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { UserSignedInEvent } from '../../domain/events/user-signed-in.event';
import { User } from '../../domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../../domain/services/password.service';

export type SignInCommand = {
  email: string;
  password: string;
};

export type SignInResult = {
  user: User;
  accessToken: string;
};

@Injectable()
export class SignInUseCase implements UseCase<SignInCommand, SignInResult> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmiiter,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: SignInCommand): Promise<SignInResult> {
    try {
      const user = await this.userRepository.findByEmail(command.email);

      if (!user) {
        throw new InvalidCredentialsError({});
      }

      const isPasswordValid = await this.passwordService.verify(
        command.password,
        user.passwordSalt,
        user.password,
      );

      if (!isPasswordValid) {
        throw new InvalidCredentialsError({});
      }

      const accessToken = await this.jwtService.signAsync({ 
        sub: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      });

      await this.eventEmitter.emit(
        new UserSignedInEvent({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
      );

      return { user, accessToken };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw error;
      }
      if (error instanceof UserPersistenceError) {
        throw error;
      }
      throw new UserPersistenceError({ cause: error });
    }
  }
}