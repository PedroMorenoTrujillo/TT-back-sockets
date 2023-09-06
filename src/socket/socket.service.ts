import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { ExchangeService } from 'src/exchange/exchange.service';

@Injectable()
export class SocketService {
  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly accountService: AccountService,
  ) {}

  async getExchange() {
    return await this.exchangeService.findAll();
  }

  async updateAndReturnExchange() {
    try {
      const exchange = await this.getExchange();
      exchange.exchange = Math.random() * (12000 - 5000) + 5000;
      await this.exchangeService.update(exchange._id, exchange);
      return this.getExchange();
    } catch {
      console.log('update exchange error');
    }
  }

  async getAllAccounts() {
    return await this.accountService.findAll();
  }

  async findOneAccount(id: string) {
    return await this.accountService.findOne(id);
  }
}
