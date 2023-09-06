import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountDetailSchema } from './account-details.schema';
import { IAccountDetail } from '../dto/accoun-detail.dto';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  accountName: string;
  @Prop()
  category: string;
  @Prop()
  tag: string;
  @Prop({ type: [AccountDetailSchema], default: [] as IAccountDetail[] })
  details: IAccountDetail[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
