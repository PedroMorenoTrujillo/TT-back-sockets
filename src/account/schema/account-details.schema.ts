import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDetailDocument = AccountDetail & Document;

@Schema({ timestamps: true })
export class AccountDetail {
  @Prop({ auto: true })
  orderCode: string;
  @Prop({ auto: true })
  orderId: string;
  @Prop({ required: true })
  transactionType?: string;
  @Prop({ required: true })
  balance: number;
  @Prop({ required: true })
  availableBalance: number;
  @Prop()
  debit: number;
  @Prop()
  credit: number;
}

export const AccountDetailSchema = SchemaFactory.createForClass(AccountDetail);
