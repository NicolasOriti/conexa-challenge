import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserRequest } from './login-user.request';
import { LoginUserResponse } from './login-user.response';
import { UserRepository } from '@src/user/domain/repositories/user.repository';
import { EncryptorService } from '@src/user/domain/services/encryptor.service';
import { TokenService } from '@src/user/domain/services/token.service';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('EncryptorService')
    private readonly encryptor: EncryptorService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async execute(req: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findByEmail(req.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = this.encryptor.compare(req.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.tokenService.sign({ id: user.id });

    return new LoginUserResponse(user, token);
  }
}
