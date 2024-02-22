import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './MulterConfigService';
import { ImageHandler } from './gm/imageHandler';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Image } from './schemas/image.schema';
import { CryptoHash } from './crypto/crypto';
import { CloudinaryModule } from 'cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    CloudinaryModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageHandler, CryptoHash, Image],
})
export class ImageModule {}
