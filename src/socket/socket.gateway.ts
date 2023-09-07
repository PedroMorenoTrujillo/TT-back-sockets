import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { randomMathInterval } from 'src/utils/ramdomMathInterval';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('exchangeInit')
  async handleInitExchangeRate() {
    this.server.emit('exchange', await this.socketService.getExchange());
  }

  @SubscribeMessage('exchange')
  async handleGetExchangeRate() {
    setInterval(async () => {
      this.server.emit(
        'exchange',
        await this.socketService.updateAndReturnExchange(),
      );
    }, 30000);
  }

  @SubscribeMessage('accountId')
  async handleGetAccountById(client: Socket, id: string) {
    this.server.emit('accountId', await this.socketService.findOneAccount(id));
  }

  @SubscribeMessage('account')
  async handleGetAllAccounts() {
    this.server.emit('account', await this.socketService.getAllAccounts());
  }

  @SubscribeMessage('account')
  async handleUpdateAccountDetails() {
    const randomIntervalTime = randomMathInterval(20000, 40000);
    const { id, data } = await this.socketService.updateAccountDetails();
    //console.log(accountForUpdate);
    setInterval(async () => {
      const allAccounts = await this.socketService.upDateRandomAccountDetails(
        id,
        data,
      );
      this.server.emit('account', await this.socketService.getAllAccounts());
      this.server.emit(
        'accountId',
        await this.socketService.findOneAccount(id),
      );
    }, randomIntervalTime);
  }
}
