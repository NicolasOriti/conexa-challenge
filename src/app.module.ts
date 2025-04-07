import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './config/configuration.module';
import { PgSqlModule } from './config/pgsql.module';

@Module({
  imports: [ConfigurationModule.forRoot(), PgSqlModule.forRoot(), UserModule],
})
export class AppModule {}
