import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// import { configuration } from 'config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    origin: 'http://localhost:8080', // Замените на разрешенный домен вашего клиента
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.BACKEND_PORT);
}

bootstrap();

console.log(`NODE_ENV=` + process.env.NODE_ENV);
console.log(`env file=` + `${process.cwd()}/.env.${process.env.NODE_ENV}`);
// console.log(configuration());
