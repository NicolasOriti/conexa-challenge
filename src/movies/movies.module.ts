import { Module } from '@nestjs/common';
import {
  CLIENTS,
  CONTROLLERS,
  REPOSITORIES,
  SERVICES,
  USE_CASES,
} from './movies.module-components';
import { PgSqlModule } from '@src/config/pgsql.module';
import { ConfigurationModule } from '@src/config/configuration.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    PgSqlModule.forRoot(),
    ScheduleModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
  ],
  providers: [...USE_CASES, ...REPOSITORIES, ...SERVICES, ...CLIENTS],
  controllers: [...CONTROLLERS],
  exports: [],
})
export class MoviesModule {}
