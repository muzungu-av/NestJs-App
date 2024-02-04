import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema() // strict: true enabled by default
export class User {
  @Prop() //, id: false
  name: string;

  @Prop({ required: true, index: { unique: true } })
  login: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
