export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordSalt: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}