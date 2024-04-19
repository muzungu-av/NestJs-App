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
import { MailModule } from 'mailing/mailing.module';
import { VideoModule } from 'video/video.module';
import { BioModule } from './bio/bio.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [winstonLogger],
    }),
    MongooseModule.forRoot(`${process.env.MONGO_DB_URI}`),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      validationSchema, // Validating the env variables
      isGlobal: true, // environment variables are available to all modules
      expandVariables: true, // allow create nested environment variables
    }),
    ImageModule,
    MailModule,
    UserModule,
    AuthModule,
    CloudinaryModule,
    VideoModule,
    BioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
