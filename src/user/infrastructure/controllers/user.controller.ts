import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginUserRequest } from '@src/user/application/use-cases/login-user/login-user.request';
import { LoginUserUseCase } from '@src/user/application/use-cases/login-user/login-user.usecase';
import { RegisterUserRequest } from '@src/user/application/use-cases/register-user/register-user.request';
import { RegisterUserUseCase } from '@src/user/application/use-cases/register-user/register-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('/register')
  async createUser(@Body() req: RegisterUserRequest): Promise<any> {
    const response = await this.registerUserUseCase.execute(req);
    return response;
  }

  @Post('/login')
  async login(@Body() req: LoginUserRequest) {
    return this.loginUserUseCase.execute(req);
  }
}
