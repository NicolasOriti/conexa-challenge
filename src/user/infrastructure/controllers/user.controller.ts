import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserRequest } from '@src/user/application/use-cases/login-user/login-user.request';
import { LoginUserUseCase } from '@src/user/application/use-cases/login-user/login-user.usecase';
import { RegisterUserRequest } from '@src/user/application/use-cases/register-user/register-user.request';
import { RegisterUserUseCase } from '@src/user/application/use-cases/register-user/register-user.usecase';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  async createUser(@Body() req: RegisterUserRequest): Promise<any> {
    const response = await this.registerUserUseCase.execute(req);
    return response;
  }

  @Post('/login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión iniciada correctamente' })
  async login(@Body() req: LoginUserRequest) {
    return this.loginUserUseCase.execute(req);
  }
}
