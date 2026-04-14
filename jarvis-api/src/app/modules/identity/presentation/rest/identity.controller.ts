import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpUseCase } from '../../application/use-cases/sign-up.usecase';
import { SignInUseCase } from '../../application/use-cases/sign-in.usecase';
import {
  SignUpDTO,
  SignInDTO,
  AuthResponseDTO,
} from './identity.controller.dto';
import { IdentityControllerMapper } from './identity.controller.mapper';
import { ErrorResponseDto } from '../../../shared/presentation/rest/dtos/error-response.dto';

@ApiTags('identity')
@Controller('identity')
export class IdentityController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly mapper: IdentityControllerMapper,
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with profile information.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: AuthResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email or phone already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
    type: ErrorResponseDto,
  })
  async signUp(@Body() dto: SignUpDTO): Promise<AuthResponseDTO> {
    const result = await this.signUpUseCase.execute(dto);
    const response: AuthResponseDTO = {
      user: this.mapper.toResponseDTO(result.user),
      accessToken: result.accessToken,
    };
    return response;
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Authenticates user credentials and returns an access token.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authentication successful',
    type: AuthResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
    type: ErrorResponseDto,
  })
  async signIn(@Body() dto: SignInDTO): Promise<AuthResponseDTO> {
    const result = await this.signInUseCase.execute(dto);
    const response: AuthResponseDTO = {
      user: this.mapper.toResponseDTO(result.user),
      accessToken: result.accessToken,
    };
    return response;
  }
}