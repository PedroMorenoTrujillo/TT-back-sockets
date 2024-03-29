import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExchangeDocument = Exchange & Document;

@Schema()
export class Exchange {
  @Prop({ required: true })
  exchange: number;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
