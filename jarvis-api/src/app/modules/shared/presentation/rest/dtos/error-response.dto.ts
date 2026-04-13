import { ApiProperty } from '@nestjs/swagger';
import { ValidationErrorItem } from '../../../domain/types/error-response';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error code identifier',
    example: 'T002',
  })
  code: string;

  @ApiProperty({
    description: 'Error title',
    example: 'Truck already exists',
  })
  title: string;

  @ApiProperty({
    description: 'Error description',
    example: 'The truck with the given license plate already exists.',
  })
  description: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 409,
  })
  status: number;

  @ApiProperty({
    description: 'Additional error metadata',
    example: {},
    required: false,
  })
  metadata?: object;

  @ApiProperty({
    description: 'Validation errors',
    example: [
      { pointer: 'email', detail: 'email must be an email' },
      {
        pointer: 'user.firstName',
        detail: 'firstName cannot be blank, firstName must be at least 3 letters',
      },
    ],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        pointer: { type: 'string' },
        detail: { type: 'string' },
      },
    },
    required: false,
  })
  errors?: ValidationErrorItem[];
}
