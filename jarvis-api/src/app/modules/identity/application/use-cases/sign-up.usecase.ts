import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UseCase } from '../../../shared/application/usecases/base.usecase';
import { UserCreationFailedError } from '../../domain/errors/user-creation-failed.error';
import { UserWithEmailAlreadyExistsError } from '../../domain/errors/user-with-email-already-exists.error';
import { UserWithPhoneAlreadyExistsError } from '../../domain/errors/user-with-phone-already-exists.error';
import { UserPersistenceError } from '../../domain/errors/user-persistence.error';
import { EventEmiiter } from '../../../shared/domain/services/event-emitter.service';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { User } from '../../domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

export type SignUpCommand = {
  name: string;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SignUpResult = {
  user: User;
  accessToken: string;
};

@Injectable()
export class SignUpUseCase implements UseCase<SignUpCommand, SignUpResult> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmiiter,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SignUpCommand): Promise<SignUpResult> {
    try {
      if (await this.isUserWithEmailAlreadyRegistered(command.email)) {
        throw new UserWithEmailAlreadyExistsError({});
      }

      if (await this.isUserWithPhoneAlreadyRegistered(command.phone)) {
        throw new UserWithPhoneAlreadyExistsError({});
      }

      const salt = randomBytes(16).toString('hex');
      const hash = createHash('sha256').update(command.password + salt).digest('hex');
      const hashedPassword = await bcrypt.hash(hash, 10);

      const user = await this.userRepository.create({
        name: command.name,
        email: command.email,
        phone: command.phone,
        password: hashedPassword,
        passwordSalt: salt,
        firstName: command.firstName,
        lastName: command.lastName,
      });

      const payload = { sub: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);

      await this.eventEmitter.emit(
        new UserCreatedEvent({
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
      if (error instanceof UserWithEmailAlreadyExistsError) {
        throw error;
      }
      if (error instanceof UserWithPhoneAlreadyExistsError) {
        throw error;
      }
      if (error instanceof UserPersistenceError) {
        throw error;
      }
      throw new UserCreationFailedError({ cause: error });
    }
  }

  private async isUserWithEmailAlreadyRegistered(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(email);
    return !!existingUser;
  }

  private async isUserWithPhoneAlreadyRegistered(phone: string): Promise<boolean> {
    const existingUser = await this.userRepository.findByPhone(phone);
    return !!existingUser;
  }
}