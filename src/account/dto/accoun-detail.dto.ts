export class IAccountDetail {
  _id?: string;
  orderId?: string;
  orderCode?: string;
  transactionType: string;
  debit?: number;
  credit?: number;
  balance: number;
  availableBalance: number;
}

export interface AccountDetail {
  _id?: string;
  orderId?: string;
  orderCode?: string;
  transactionType: string;
  debit?: number;
  credit?: number;
  balance: number;
  availableBalance: number;
}
