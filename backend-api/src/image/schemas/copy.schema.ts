import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AllDimension } from 'image/dto/create-image.dto';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'user/schemas/user.schema';
import { CopyAttribute } from '../dto/create-copy.dto';

export type CopyDocument = Copy & Document;

@Schema() // strict: true enabled by default
export class Copy {
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

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false })
  miniImageUrl: string;

  @Prop({ required: true })
  sizeBytes: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  typeOfImage: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  dimension: AllDimension;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  copyAttribute: CopyAttribute[];
}

export const CopySchema = SchemaFactory.createForClass(Copy);
