import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../../prisma/infrastructure/prisma.repository';
import { UserRepository, CreateUserData } from '../../domain/repositories/user.repository';
import { User, UserStatus } from '../../domain/entities/user.entity';
import { UserPersistenceError } from '../../domain/errors/user-persistence.error';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  async create(data: CreateUserData): Promise<User> {
    try {
      const created = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          passwordSalt: data.passwordSalt,
          profile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          password: true,
          passwordSalt: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.mapToDomain(created);
    } catch (error) {
      throw new UserPersistenceError({ cause: error });
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          password: true,
          passwordSalt: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user ? this.mapToDomain(user) : null;
    } catch (error) {
      throw new UserPersistenceError({ cause: error });
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          password: true,
          passwordSalt: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user ? this.mapToDomain(user) : null;
    } catch (error) {
      throw new UserPersistenceError({ cause: error });
    }
  }

  async findByPhone(phone: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { phone },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          password: true,
          passwordSalt: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user ? this.mapToDomain(user) : null;
    } catch (error) {
      throw new UserPersistenceError({ cause: error });
    }
  }

  async updatePassword(id: string, password: string, salt: string): Promise<User> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: {
          password,
          passwordSalt: salt,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          password: true,
          passwordSalt: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.mapToDomain(updated);
    } catch (error) {
      throw new UserPersistenceError({ cause: error });
    }
  }

  private mapToDomain(prismaUser: {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordSalt: string;
    status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      phone: prismaUser.phone,
      password: prismaUser.password,
      passwordSalt: prismaUser.passwordSalt,
      status: prismaUser.status as UserStatus,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }
}