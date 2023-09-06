import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  async handleConnection() {
    const newValue = await this.socketService.getExchange();
    this.server.emit('exchange', newValue);
    this.handleAccounts();
    setInterval(async () => {
      this.server.emit(
        'exchange',
        await this.socketService.updateAndReturnExchange(),
      );
    }, 10000);
  }
  handleDisconnect() {
    this.server.disconnectSockets();
  }

  async handleAccounts() {
    const accounts = await this.socketService.getAllAccounts();
    this.server.emit('account', accounts);
  }

  @SubscribeMessage('accountId')
  async handleGetAccountById(client: Socket, id: string) {
    const account = await this.socketService.findOneAccount(id);
    this.server.emit('accountId', account);
  }
}
