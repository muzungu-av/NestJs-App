import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { configuration } from 'config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

console.log(`NODE_ENV=` + process.env.NODE_ENV);
console.log(`env file=` + `${process.cwd()}/.env.${process.env.NODE_ENV}`);
// console.log(configuration());
