import { Provider } from '@nestjs/common';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { UserController } from './infrastructure/controllers/user.controller';
import { ConfigService } from '@nestjs/config';
import { RegisterUserUseCase } from './application/use-cases/register-user/register-user.usecase';
import { BcryptEncryptorService } from './infrastructure/services/bcrypt-encryptor.service';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';

export const REPOSITORIES: Provider[] = [
  {
    provide: 'UserRepository',
    useClass: TypeOrmUserRepository,
  },
];

export const CONTROLLERS = [UserController];

export const CLIENTS: Provider[] = [];

export const USE_CASES: Provider[] = [RegisterUserUseCase];

export const SERVICES: Provider[] = [
  {
    provide: 'ConfigService',
    useClass: ConfigService,
  },
  {
    provide: 'EncryptorService',
    useClass: BcryptEncryptorService,
  },
  {
    provide: 'TokenService',
    useClass: JwtTokenService,
  },
];
