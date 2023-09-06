import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from './schema/exchange.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exchange.name,
        schema: ExchangeSchema,
      },
    ]),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
