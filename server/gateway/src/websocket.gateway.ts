import {
  HttpStatus,
  Inject,
  Logger,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { IAuthorizedSocket } from './interfaces/websocket/socket/socket.interface';
import { ISocketMessage } from './interfaces/websocket/socket-message/socket-message.interface';
import { PermissionGuard } from './services/guard/permission.guard';
import { ClientProxy } from '@nestjs/microservices';

import {
  ISocketEvent,
  ISocketEventMethod,
} from './interfaces/websocket/socket-emit/socket-event.interface';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected readonly logger = new Logger(WebsocketGateway.name);

  constructor(
    @Inject('USER_SERVICE') protected readonly userServiceClient: ClientProxy,
    @Inject('DUEL_SERVICE') protected readonly duelServiceClient: ClientProxy,
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  async handleConnection(client: IAuthorizedSocket) {
    this.userServiceClient.emit('set_user_is_online', {
      id: client.userId,
      isOnline: true,
    });
    client.join(client.userId);
  }

  async handleDisconnect(client: IAuthorizedSocket) {
    this.userServiceClient.emit('set_user_is_online', {
      id: client.userId,
      isOnline: false,
    });
  }

  @SetMetadata('permission', { roles: ['admin'], areAuthorized: true })
  @UseGuards(PermissionGuard)
  @SubscribeMessage('ping')
  async ping(@ConnectedSocket() client: IAuthorizedSocket) {
    client.send({
      statusCode: HttpStatus.OK,
      message: 'pong',
    } as ISocketMessage);
  }

  @SubscribeMessage('duel__join_queue')
  async waitingForDuel(@ConnectedSocket() client: IAuthorizedSocket) {
    const eventName = 'duel__join_queue';

    client.send({
      event: eventName,
      method: ISocketEventMethod.GET,
      data: null,
    } as ISocketEvent);
  }
}
