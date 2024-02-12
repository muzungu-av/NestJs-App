import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema() // strict: true enabled by default
export class User {
  @Prop() //, id: false
  username: string;

  @Prop({ required: true, index: { unique: true } })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
