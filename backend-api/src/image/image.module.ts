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
import { UserModule } from 'user/user.module';
import { SliderMemoryService } from './utils/SliderMemoryService';
import { Copy, CopySchema } from './schemas/copy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    MongooseModule.forFeature([{ name: Copy.name, schema: CopySchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    CloudinaryModule,
    UserModule,
  ],
  controllers: [ImageController],
  providers: [
    ImageService,
    ImageHandler,
    CryptoHash,
    Image,
    Copy,
    SliderMemoryService,
  ],
})
export class ImageModule {}
