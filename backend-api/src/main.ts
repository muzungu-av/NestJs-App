import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configuration } from 'config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: ['Authorization'],
    origin: [
      configuration().CORS_ORIGIN_URL1,
      configuration().CORS_ORIGIN_URL2,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(configuration().BACKEND_PORT);
}

bootstrap();
