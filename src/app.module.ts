import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { ExchangeModule } from './exchange/exchange.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/TTback'),
    AccountModule,
    ExchangeModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
