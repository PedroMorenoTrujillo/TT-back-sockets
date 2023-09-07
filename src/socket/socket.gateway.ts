import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';

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
    }, 10000);
  }

  @SubscribeMessage('accountId')
  async handleGetAccountById(client: Socket, id: string) {
    this.server.emit('accountId', await this.socketService.findOneAccount(id));
  }

  @SubscribeMessage('account')
  async handleGetAllAccounts() {
    this.server.emit('account', await this.socketService.getAllAccounts());
  }
}
