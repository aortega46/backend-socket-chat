/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  afterInit(server: any) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('user connected', client.handshake.auth);
    client.join(`channel general`);
  }
  handleDisconnect(client: any) {
    console.log('user disconnect');
  }

  @SubscribeMessage('channel join')
  handleJoinRoom(client: Socket, ch: string) {
    client.join(`channel ${ch}`);
  }

  @SubscribeMessage('chat message')
  handleIncomingMessage(client: Socket, chatMessage: Message) {
    console.log('New message', { chatMessage });
    this.server
      .to(`channel ${chatMessage.channel}`)
      .emit('chat message', chatMessage);
  }
}
