import { IAccountDetail } from './accoun-detail.dto';

export class CreateAccountDto {
  accountName: string;
  category?: string;
  tag?: string;
  balance: number;
  availableBalance: number;
  details: IAccountDetail[];
}

export interface IAccount {
  accountName: string;
  category?: string;
  tag?: string;
  balance: number;
  availableBalance: number;
  details: IAccountDetail[];
}
