import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { ExchangeService } from 'src/exchange/exchange.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from 'src/exchange/schema/exchange.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exchange.name,
        schema: ExchangeSchema,
      },
    ]),
  ],
  providers: [SocketGateway, SocketService, ExchangeService],
})
export class SocketModule {}
