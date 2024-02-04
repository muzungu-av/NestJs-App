// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MongodbService } from './mongodb.service';

// import { UserController } from 'user/user.controller';
// import { UserService } from 'user/user.service';
// import { UserModule } from 'user/user.module';
// import { User, UserSchema } from 'user/schemas/user.schema';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://172.18.0.101:27017/paint', {
//       connectionName: 'users',
//     }),
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     UserModule,
//   ],
//   controllers: [UserController],
//   providers: [MongodbService, UserService],
//   exports: [MongodbService],
// })
// export class MongodbModule {}
