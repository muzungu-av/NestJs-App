import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type BioDocument = Bio & Document;

@Schema()
export class Bio {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: false })
  imgUrl: string;
}

export const BioSchema = SchemaFactory.createForClass(Bio);
