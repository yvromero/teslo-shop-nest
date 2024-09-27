import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() 
  wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection( client: Socket ) {

    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify( token );
      await this.messagesWsService.registerClient( client, payload.id );
    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log({payload});

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() );
  }

  handleDisconnect( client: Socket ) {

    this.messagesWsService.removeClient( client.id );

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() )
  }

  @SubscribeMessage('message-from-client')
    onMessageFromClient( client: Socket, payload: NewMessageDto ) {

    //! Notify only the client
    // client.emit('message-from-server', {
    //   fullname: 'ITS ME',
    //   message: payload.message || 'no-message'
    // });

    //! Notify everyone except the initial client
    // client.broadcast.emit('message-from-server', {
    //   fullname: 'ITS ME',
    //   message: payload.message || 'no-message'
    // });

    //! Notify everyone
    this.wss.emit('message-from-server', {
      fullname: this.messagesWsService.getUserfullName(client.id),
      message: payload.message || 'no-message'
    });
    }

}
