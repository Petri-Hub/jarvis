import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(data: CreateUserData): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByPhone(phone: string): Promise<User | null>;
  abstract updatePassword(id: string, password: string, salt: string): Promise<User>;
}

export type CreateUserData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordSalt: string;
  firstName: string;
  lastName: string;
};