import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configuration } from 'config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    allowedHeaders: ['content-type'], // с "*" не работает
    origin: configuration().CORS_ORIGIN_URL,
    credentials: true,
  });

  await app.listen(configuration().BACKEND_PORT);
}

bootstrap();
