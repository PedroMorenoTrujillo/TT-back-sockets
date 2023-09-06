import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  accountName: string;
  @Prop({ required: true })
  category?: string;
  @Prop({ required: true })
  tag?: string;
  @Prop({ required: true })
  balance: number;
  @Prop({ required: true })
  availableBalance: number;
  @Prop({ unique: true, required: true })
  orderCode: string;
  @Prop({ unique: true, required: true })
  orderId: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
