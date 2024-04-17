import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from 'cloudinary/cloudinary.module';
import { MulterConfigService } from 'image/MulterConfigService';
import { CryptoHash } from 'image/crypto/crypto';
import { ImageHandler } from 'image/gm/imageHandler';
import { BioController } from './bio.controller';
import { Bio, BioSchema } from './schemas/bio.shema';
import { BioService } from './bio.service';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bio.name, schema: BioSchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    CloudinaryModule,
    UserModule,
  ],
  controllers: [BioController],
  providers: [BioService, Bio, ImageHandler, CryptoHash],
})
export class BioModule {}
