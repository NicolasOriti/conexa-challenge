import { LoginUserUseCase } from '@src/user/application/use-cases/login-user/login-user.usecase';
import { UserRepository } from '@src/user/domain/repositories/user.repository';
import { EncryptorService } from '@src/user/domain/services/encryptor.service';
import { TokenService } from '@src/user/domain/services/token.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '@src/user/domain/entities/user.entity';
import { LoginUserRequest } from '@src/user/application/use-cases/login-user/login-user.request';
import { LoginUserResponse } from '@src/user/application/use-cases/login-user/login-user.response';

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let encryptor: jest.Mocked<EncryptorService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as any;

    encryptor = {
      compare: jest.fn(),
    } as any;

    tokenService = {
      sign: jest.fn(),
    } as any;

    useCase = new LoginUserUseCase(userRepository, encryptor, tokenService);
  });

  const mockUser = User.createExisting({
    id: 'user-id',
    fullname: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    roles: ['user'],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const request: LoginUserRequest = {
    email: 'john@example.com',
    password: 'plain-password',
  };

  it('should return token and user when credentials are valid', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUser);
    encryptor.compare.mockReturnValue(true);
    tokenService.sign.mockReturnValue('valid-token');

    const response = await useCase.execute(request);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(request.email);
    expect(encryptor.compare).toHaveBeenCalledWith(
      request.password,
      mockUser.password,
    );
    expect(tokenService.sign).toHaveBeenCalledWith({ id: mockUser.id });

    expect(response).toBeInstanceOf(LoginUserResponse);
    expect(response.token).toBe('valid-token');
    expect(response.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      fullname: mockUser.fullname,
      roles: mockUser.roles,
    });
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute(request)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(encryptor.compare).not.toHaveBeenCalled();
    expect(tokenService.sign).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUser);
    encryptor.compare.mockReturnValue(false);

    await expect(useCase.execute(request)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
