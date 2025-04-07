import { Module } from '@nestjs/common';
import {
  CLIENTS,
  CONTROLLERS,
  REPOSITORIES,
  SERVICES,
  USE_CASES,
} from './user.module-components';
import { PgSqlModule } from '@src/config/pgsql.module';
import { ConfigurationModule } from '@src/config/configuration.module';
import { JwtConfigModule } from '@src/config/jwt.module';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    PgSqlModule.forRoot(),
    JwtConfigModule.forRoot(),
  ],
  providers: [...USE_CASES, ...REPOSITORIES, ...SERVICES, ...CLIENTS],
  controllers: [...CONTROLLERS],
})
export class UserModule {}
