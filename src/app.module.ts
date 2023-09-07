import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { ExchangeModule } from './exchange/exchange.module';
import { SocketModule } from './socket/socket.module';

// Change your own DDBB connection string here!!!!
const ddbbMongoConecctionString: string = 'mongodb://localhost/TTback';
@Module({
  imports: [
    MongooseModule.forRoot(ddbbMongoConecctionString),
    AccountModule,
    ExchangeModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
