import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita propiedades no definidas en DTO
      forbidNonWhitelisted: true, // lanza error si vienen propiedades no permitidas
      transform: true, // transforma los tipos (por ejemplo string → number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
