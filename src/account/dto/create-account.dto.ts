export class CreateAccountDto {
  accountName: string;
  category?: string;
  tag?: string;
  balance: number;
  availableBalance: number;
  orderCode: string;
  orderId: string;
}
