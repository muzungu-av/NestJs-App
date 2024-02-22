import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { validationSchema } from 'config/validation';
import { ImageModule } from 'image/image.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './winston.logger';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

console.log('NODE_ENV = ' + process.env.NODE_ENV);
console.log('env file = ');
console.log(`${process.cwd()}/.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [winstonLogger],
    }),
    MongooseModule.forRoot(
      `mongodb://owner:903903@172.18.0.103:27017/paintings`,
    ),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      validationSchema, // Validating the env variables
      isGlobal: true, // environment variables are available to all modules
      expandVariables: true, // allow create nested environment variables
    }),
    ImageModule,
    UserModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppService],
})
export class AppModule {}
