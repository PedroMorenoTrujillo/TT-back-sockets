import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { ExchangeService } from 'src/exchange/exchange.service';
import { randomMathInterval } from 'src/utils/ramdomMathInterval';

@Injectable()
export class SocketService {
  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly accountService: AccountService,
  ) {}

  async getExchange() {
    try {
      return await this.exchangeService.findAll();
    } catch {
      console.log('Get exchange rate error');
    }
  }

  async updateAndReturnExchange() {
    try {
      const exchange = await this.getExchange();
      exchange.exchange = randomMathInterval(5000, 12000);
      await this.exchangeService.update(exchange._id, exchange);
      return this.getExchange();
    } catch {
      console.log('update exchange error');
    }
  }

  async getAllAccounts() {
    try {
      return await this.accountService.findAll();
    } catch {
      console.log('get all accounts error');
    }
  }

  async findOneAccount(id: string) {
    try {
      return await this.accountService.findOne(id);
    } catch {
      console.log('find account error');
    }
  }
}
