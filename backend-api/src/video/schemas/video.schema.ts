import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'user/schemas/user.schema';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
