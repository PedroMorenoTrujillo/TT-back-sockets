import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { IAccount } from 'src/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { ExchangeService } from 'src/exchange/exchange.service';
import { randomMathInterval } from 'src/utils/ramdomMathInterval';
import { updateMapperTool } from 'src/utils/updateMapperTool';

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

  async upDateRandomAccountDetails(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ) {
    try {
      return await this.accountService.update(id, updateAccountDto);
    } catch {
      console.log('Update account details error');
    }
  }

  async updateAccountDetails(): Promise<{ id: string; data: IAccount }> {
    try {
      const accounts = await this.getAllAccounts();
      const accountsIds = accounts.map((account) => account._id);
      const idRandom = accountsIds[
        Math.floor(Math.random() * accountsIds.length)
      ] as string;

      const accountSelected = accounts.filter(
        (account) => (account._id = idRandom),
      )[0];
      const newUpdateAccount = updateMapperTool(accountSelected as IAccount);
      return { id: idRandom, data: newUpdateAccount };
    } catch {
      console.log('Update account error');
    }
  }
}
