import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'image/MulterConfigService';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'cloudinary/cloudinary.module';
import { UserModule } from 'user/user.module';
import { VideoController } from './video.controller';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideoService } from './video.service';
import { ImageHandler } from 'image/gm/imageHandler';
import { CryptoHash } from 'image/crypto/crypto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    CloudinaryModule,
    UserModule,
  ],
  controllers: [VideoController],
  providers: [VideoService, Video, ImageHandler, CryptoHash],
})
export class VideoModule {}
