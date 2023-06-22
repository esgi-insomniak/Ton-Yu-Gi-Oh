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
import { GetResponseOne } from './interfaces/common/common.response';
import { IUser } from './interfaces/user-service/user/user.interface';
import { firstValueFrom } from 'rxjs';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected readonly logger = new Logger(WebsocketGateway.name);

  constructor(
    @Inject('USER_SERVICE') protected readonly userServiceClient: ClientProxy,
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
  async test(@ConnectedSocket() client: IAuthorizedSocket) {
    client.send({
      statusCode: HttpStatus.OK,
      message: 'pong',
    } as ISocketMessage);
  }
}
