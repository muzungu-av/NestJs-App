import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from 'image/schemas/image.schema';
import { Copy, CopySchema } from 'image/schemas/copy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    MongooseModule.forFeature([{ name: Copy.name, schema: CopySchema }]),
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
