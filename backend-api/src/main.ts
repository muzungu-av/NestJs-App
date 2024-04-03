import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configuration } from 'config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  const corsOrigins = configuration().CORS_ORIGIN_URLS.split(',');
  app.enableCors({
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: ['Authorization'],
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  });

  await app.listen(configuration().BACKEND_PORT);
}

bootstrap();
