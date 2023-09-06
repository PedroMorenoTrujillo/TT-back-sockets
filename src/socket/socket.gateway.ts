import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() sever: Server;

  constructor(private readonly socketService: SocketService) {}

  async handleConnection() {
    const newValue = await this.socketService.getExchange();
    this.sever.emit('exchange', newValue);
    setInterval(async () => {
      this.sever.emit(
        'exchange',
        await this.socketService.updateAndReturnExchange(),
      );
    }, 10000);
  }
  handleDisconnect() {
    this.sever.disconnectSockets();
  }

  @SubscribeMessage('exchange')
  exchange() {
    console.log('exchange function');
    this.sever.emit('exchange', 4000);
  }
}