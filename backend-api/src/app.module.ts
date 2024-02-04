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

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://picAdmin:618542@172.18.0.101:27017/paint`,
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
  ],
  controllers: [AppController],
  providers: [AppService, AppService],
})
export class AppModule {}
