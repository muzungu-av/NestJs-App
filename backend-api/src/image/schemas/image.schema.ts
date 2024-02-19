import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema() // strict: true enabled by default
export class Image {
  @Prop({ required: false, index: { unique: true } })
  uid: string;

  @Prop({ required: false }) //, id: false
  originalName: string;

  @Prop({ required: false, index: { unique: true } })
  fileName: string;

  @Prop({ required: false })
  path: string;

  @Prop({ required: false })
  miniPath: string;

  @Prop({ required: false })
  sizeBytes: string;

  @Prop({ required: false })
  createdAt: string;

  @Prop({ required: false })
  description: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
