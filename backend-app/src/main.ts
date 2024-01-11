import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//todo - придумать механизм авторизации
//todo - scope области видимости для разделения запросов разных клиентов (https://nestjs.ru/fundamentals/injection-scopes)
//todo - длительный процесс работы с файлом (вместо ws) - https://nestjs.ru/controllers подзаголовок Asynchronicity
//todo - валидатор и pipe для метода /image
//todo - HTTP Digest Auth
