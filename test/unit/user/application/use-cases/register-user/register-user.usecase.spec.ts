import { RegisterUserUseCase } from '@src/user/application/use-cases/register-user/register-user.usecase';
import { UserRepository } from '@src/user/domain/repositories/user.repository';
import { EncryptorService } from '@src/user/domain/services/encryptor.service';
import { TokenService } from '@src/user/domain/services/token.service';
import { RegisterUserRequest } from '@src/user/application/use-cases/register-user/register-user.request';
import { User } from '@src/user/domain/entities/user.entity';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let encryptor: jest.Mocked<EncryptorService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as any;

    encryptor = {
      hash: jest.fn(),
    } as any;

    tokenService = {
      sign: jest.fn(),
    } as any;

    useCase = new RegisterUserUseCase(userRepository, encryptor, tokenService);
  });

  const request: RegisterUserRequest = {
    fullname: 'Luke Skywalker',
    email: 'luke@jedi.com',
    password: 'theforce',
  };

  it('should create a user and return token if email is not taken', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    encryptor.hash.mockReturnValue('hashed-password');
    tokenService.sign.mockReturnValue('jwt-token');

    const result = await useCase.execute(request);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(request.email);
    expect(encryptor.hash).toHaveBeenCalledWith(request.password);
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
    expect(tokenService.sign).toHaveBeenCalledWith({ id: expect.any(String) });

    expect(result).toEqual({
      user: expect.any(User),
      token: 'jwt-token',
    });
  });

  it('should throw error if email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue(
      User.create({ ...request, password: 'alreadyHashed' }),
    );

    await expect(useCase.execute(request)).rejects.toThrow(
      'Email already in use',
    );

    expect(encryptor.hash).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
    expect(tokenService.sign).not.toHaveBeenCalled();
  });
});
