import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { validationSchema } from 'config/validation';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      validationSchema, // Validating the env variables
      isGlobal: true, // environment variables are available to all modules
      expandVariables: true, // allow create nested environment variables
    }),
    ImageModule,
  ],
})
export class AppModule {}
