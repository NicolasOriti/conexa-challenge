// src/config/jwt.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeys } from './config-keys';

@Module({})
export class JwtConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: JwtConfigModule,
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): JwtModuleOptions => ({
            secret: configService.get<string>(ConfigKeys.JWT_SECRET),
            signOptions: {
              expiresIn: '2h',
            },
          }),
        }),
      ],
      exports: [JwtModule], // 👈 necesario para que otros módulos usen JwtService
    };
  }
}
