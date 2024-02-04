import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

/*
Эта ошибка чаще всего возникает, когда NestJS не может найти или создать экземпляр зависимости, 
которая требуется для вашего сервиса UserService. 
В данном случае, проблема связана с зависимостью UserModel, 
которая должна быть доступна в контексте UserModule.
*/
