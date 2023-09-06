import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/exchange/exchange.service';

@Injectable()
export class SocketService {
  constructor(private readonly exchangeService: ExchangeService) {}

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
}
