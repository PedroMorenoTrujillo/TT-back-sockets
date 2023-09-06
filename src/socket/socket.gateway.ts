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
    this.server.emit('exchange', await this.socketService.getExchange());
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
    this.server.emit('account', await this.socketService.getAllAccounts());
  }

  @SubscribeMessage('accountId')
  async handleGetAccountById(client: Socket, id: string) {
    this.server.emit('accountId', await this.socketService.findOneAccount(id));
  }
}
