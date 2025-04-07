import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserRequest } from '@src/user/application/use-cases/register-user/register-user.request';
import { RegisterUserUseCase } from '@src/user/application/use-cases/register-user/register-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('/register')
  async createUser(@Body() req: RegisterUserRequest): Promise<any> {
    const response = await this.registerUserUseCase.execute(req);
    return response;
  }
}
