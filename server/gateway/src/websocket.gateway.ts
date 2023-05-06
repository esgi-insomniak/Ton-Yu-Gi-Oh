import {
  HttpStatus,
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
import { AuthGuard } from './services/guard/authorization.guard';
import { ISocketMessage } from './interfaces/websocket/socket-message/socket-message.interface';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketGateway.name);

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  async handleConnection(client: IAuthorizedSocket) {
    if (client.user === undefined) {
      return this.logger.debug(`Connected user anonymous id: ${client.id}`);
    }
    this.logger.debug(`Connected user: ${client.user.username}`);
  }

  async handleDisconnect(client: IAuthorizedSocket) {
    if (client.user === undefined) {
      return this.logger.debug(`Disconnected user anonymous id: ${client.id}`);
    }
    this.logger.debug(`Disconnected user: ${client.user.username}`);
  }

  @SetMetadata('secured', true)
  @UseGuards(AuthGuard)
  @SubscribeMessage('ping')
  async test(@ConnectedSocket() client: IAuthorizedSocket) {
    client.send({
      statusCode: HttpStatus.OK,
      message: 'pong',
    } as ISocketMessage);
  }
}
