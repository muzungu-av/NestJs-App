import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'user/schemas/user.schema';

export type ImageDocument = Image & Document;

@Schema() // strict: true enabled by default
export class Image {
  @Prop({ required: true, index: { unique: true } })
  uid: string;

  @Prop({ required: true }) //, id: false
  originalName: string;

  @Prop({ required: true, index: { unique: true } })
  fileName: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  miniPath: string;

  @Prop({ required: true })
  sizeBytes: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
