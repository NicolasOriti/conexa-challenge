import { User } from '@src/user/domain/entities/user.entity';
import { RegisterUserRequest } from './register-user.request';
import { RegisterUserResponse } from './register-user.response';
import { UserRepository } from '@src/user/domain/repositories/user.repository';
import { EncryptorService } from '@src/user/domain/services/encryptor.service';
import { TokenService } from '@src/user/domain/services/token.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('EncryptorService')
    private readonly encryptor: EncryptorService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async execute(req: RegisterUserRequest): Promise<RegisterUserResponse> {
    const existing = await this.userRepository.findByEmail(req.email);
    if (existing) throw new Error('Email already in use');

    const hashedPassword = this.encryptor.hash(req.password);

    const user = User.create({ ...req, password: hashedPassword });
    const token = this.tokenService.sign({ id: user.id });
    await this.userRepository.save(user);

    return {
      user,
      token,
    };
  }
}
