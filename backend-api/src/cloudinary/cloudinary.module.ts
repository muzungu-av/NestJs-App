import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from 'image/schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
