import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserResponseDTO } from './identity.controller.dto';

@Injectable()
export class IdentityControllerMapper {
  toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}