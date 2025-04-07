import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ConfigKeys } from './config-keys';
import { UserPersistence } from '@src/user/infrastructure/persistence/typeorm-user.persistence';
import { MoviePersistence } from '@src/movies/infrastructure/persistence/movie.persistence';

export const ENTITIES = [UserPersistence, MoviePersistence];

const ORM_TYPE = 'postgres';

@Module({})
export class PgSqlModule {
  static forRoot(
    typeOrmOptions?: TypeOrmModuleOptions,
    entities: EntityClassOrSchema[] = ENTITIES,
  ): DynamicModule {
    return {
      module: PgSqlModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
            return {
              ...this.getDefaultPgSqlConfig(configService, entities),
              ...typeOrmOptions,
            } as TypeOrmModuleOptions;
          },
        }),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [TypeOrmModule],
    };
  }

  static getDefaultPgSqlConfig(
    configService: ConfigService,
    entities: EntityClassOrSchema[],
  ): TypeOrmModuleOptions {
    return {
      type: ORM_TYPE,
      host: configService.get<string>(ConfigKeys.DB_HOST),
      port: configService.get<number>(ConfigKeys.DB_PORT),
      username: configService.get<string>(ConfigKeys.DB_USER),
      password: configService.get<string>(ConfigKeys.DB_PASSWORD),
      database: configService.get<string>(ConfigKeys.DB_NAME),
      synchronize: false,
      entities: entities,
    } as TypeOrmModuleOptions;
  }
}
