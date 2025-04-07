import { ConfigKeys } from '@config/config-keys';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({})
export class ConfigurationModule {
  private static DEFAULT_ENV_FILE = '/.env';

  static forRoot(envFile?: string): DynamicModule {
    return {
      module: ConfigurationModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath:
            process.cwd() + (envFile ?? ConfigurationModule.DEFAULT_ENV_FILE),
          validationSchema: Joi.object({
            [ConfigKeys.HOST]: Joi.string().default('0.0.0.0'),
            [ConfigKeys.PORT]: Joi.number().default(3000),
            [ConfigKeys.DB_HOST]: Joi.string().required(),
            [ConfigKeys.DB_PORT]: Joi.number().required(),
            [ConfigKeys.DB_USER]: Joi.string().required(),
            [ConfigKeys.DB_PASSWORD]: Joi.string().required(),
            [ConfigKeys.DB_NAME]: Joi.string().required(),
            [ConfigKeys.JWT_SECRET]: Joi.string().required(),
          }),
          isGlobal: true,
        }),
      ],
      exports: [ConfigModule],
    };
  }
}
