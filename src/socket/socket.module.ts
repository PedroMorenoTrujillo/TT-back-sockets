import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { ExchangeService } from 'src/exchange/exchange.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from 'src/exchange/schema/exchange.schema';
import { Account, AccountSchema } from 'src/account/schema/account.schema';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exchange.name,
        schema: ExchangeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [SocketGateway, SocketService, ExchangeService, AccountService],
})
export class SocketModule {}
