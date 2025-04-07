import { UserController } from '@src/user/infrastructure/controllers/user.controller';
import { RegisterUserUseCase } from '@src/user/application/use-cases/register-user/register-user.usecase';
import { LoginUserUseCase } from '@src/user/application/use-cases/login-user/login-user.usecase';
import { RegisterUserRequest } from '@src/user/application/use-cases/register-user/register-user.request';
import { LoginUserRequest } from '@src/user/application/use-cases/login-user/login-user.request';
import { User } from '@src/user/domain/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let registerUserUseCase: jest.Mocked<RegisterUserUseCase>;
  let loginUserUseCase: jest.Mocked<LoginUserUseCase>;

  beforeEach(() => {
    registerUserUseCase = { execute: jest.fn() } as any;
    loginUserUseCase = { execute: jest.fn() } as any;

    controller = new UserController(registerUserUseCase, loginUserUseCase);
  });

  it('should register a user', async () => {
    const request: RegisterUserRequest = {
      fullname: 'Leia Organa',
      email: 'leia@rebellion.com',
      password: 'alderaan',
    };

    const mockUser = User.createExisting({
      id: '1',
      fullname: 'Leia Organa',
      email: 'leia@rebellion.com',
      password: 'hashed-password',
      roles: ['user'],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockResponse = {
      user: mockUser,
      token: 'fake-jwt-token',
    };

    registerUserUseCase.execute.mockResolvedValue(mockResponse);

    const response = await controller.createUser(request);

    expect(registerUserUseCase.execute).toHaveBeenCalledWith(request);
    expect(response).toEqual(mockResponse);
  });

  it('should log in a user', async () => {
    const request: LoginUserRequest = {
      email: 'leia@rebellion.com',
      password: 'alderaan',
    };

    const mockResponse = {
      user: {
        id: '1',
        fullname: 'Leia Organa',
        email: 'leia@rebellion.com',
        roles: ['user'],
      },
      token: 'valid-jwt-token',
    };

    loginUserUseCase.execute.mockResolvedValue(mockResponse);

    const response = await controller.login(request);

    expect(loginUserUseCase.execute).toHaveBeenCalledWith(request);
    expect(response).toEqual(mockResponse);
  });
});
