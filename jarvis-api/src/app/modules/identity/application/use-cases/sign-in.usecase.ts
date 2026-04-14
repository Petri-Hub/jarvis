import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import { UserPersistenceError } from '../../domain/errors/user-persistence.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { UserSignedInEvent } from '../../domain/events/user-signed-in.event';
import { User } from '../../domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

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
  ) {}

  async execute(command: SignInCommand): Promise<SignInResult> {
    try {
      const user = await this.userRepository.findByEmail(command.email);

      if (!user) {
        throw new InvalidCredentialsError({});
      }

      const hash = createHash('sha256').update(command.password + user.passwordSalt).digest('hex');
      const isPasswordValid = await bcrypt.compare(hash, user.password);

      if (!isPasswordValid) {
        throw new InvalidCredentialsError({});
      }

      const payload = { sub: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);

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