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
import { v4 as uuidv4 } from 'uuid';

import {
  ISocketEvent,
  ISocketEventType,
} from './interfaces/websocket/socket-emit/socket-event.interface';
import { IDuel } from './interfaces/duel-service/duel/duel.interface';
import { IDuelPlayer } from './interfaces/duel-service/duelPlayer/duel-player.interface';
import { GetResponseOne } from './interfaces/common/common.response';
import { firstValueFrom } from 'rxjs';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected readonly logger = new Logger(WebsocketGateway.name);

  protected duelQueue: Array<{
    socket: IAuthorizedSocket;
    timeout?: NodeJS.Timeout;
    interval?: NodeJS.Timeout;
  }> = [];

  constructor(
    @Inject('USER_SERVICE') protected readonly userServiceClient: ClientProxy,
    @Inject('DUEL_SERVICE') protected readonly duelServiceClient: ClientProxy,
    @Inject('CARD_SERVICE') protected readonly cardServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    protected readonly userDeckServiceClient: ClientProxy,
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
    this.duelQueue = this.duelQueue.filter(
      (user) => user.socket.userId !== client.userId,
    );

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
  async duelJoinQueue(@ConnectedSocket() client: IAuthorizedSocket) {
    const eventName = 'duel__queue';

    if (this.duelQueue.find((user) => user.socket.userId === client.userId)) {
      client.emit(eventName, {
        event: eventName,
        type: ISocketEventType.ERROR,
        data: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'You are already in the queue.',
        } as ISocketMessage,
      } as ISocketEvent);
      return;
    }

    const searchInterval = setInterval(async () => {
      if (this.duelQueue.length > 1) {
        const userFound = this.duelQueue.find(
          (user) => user.socket.userId !== client.userId,
        );

        if (!userFound) return;

        // remove both users from the queue
        this.duelQueue = this.duelQueue.filter(
          (user) =>
            user.socket.userId !== client.userId &&
            user.socket.userId !== userFound.socket.userId,
        );

        // remove timeouts and intervals
        clearTimeout(leaveQueueTimeout);
        clearInterval(searchInterval);
        clearTimeout(userFound.timeout);
        clearInterval(userFound.interval);

        const newDuelPartial: Partial<IDuel> = {
          roomId: uuidv4(),
          players: [
            {
              userId: client.userId,
              username: client.username,
              turnToPlay: true,
            },
            {
              userId: userFound.socket.userId,
              username: userFound.socket.username,
            },
          ],
        };

        const newDuelResponse: GetResponseOne<IDuel> = await firstValueFrom(
          this.duelServiceClient.send('create_duel', newDuelPartial),
        );

        if (newDuelResponse.status !== HttpStatus.CREATED) {
          client.emit(eventName, {
            event: eventName,
            type: ISocketEventType.ERROR,
            data: {
              statusCode: newDuelResponse.status,
              message: newDuelResponse.message,
            } as ISocketMessage,
          } as ISocketEvent);
          return;
        }

        // add 2 users to the duel room
        client.join(newDuelResponse.item.roomId);
        userFound.socket.join(newDuelResponse.item.roomId);

        this.io.to(newDuelResponse.item.roomId).emit('duel__found', {
          event: 'duel__found',
          type: ISocketEventType.INFO,
          data: newDuelResponse.item,
        } as ISocketEvent);
      }
    }, 5000);

    const leaveQueueTimeout = setTimeout(() => {
      this.duelQueue = this.duelQueue.filter(
        (user) => user.socket.userId !== client.userId,
      );

      clearInterval(searchInterval);
      clearTimeout(leaveQueueTimeout);

      client.emit(eventName, {
        event: eventName,
        type: ISocketEventType.ERROR,
        data: {
          statusCode: HttpStatus.REQUEST_TIMEOUT,
          message: 'No duel found.',
        } as ISocketMessage,
      } as ISocketEvent);
    }, 60000);

    this.duelQueue.push({
      socket: client,
      timeout: leaveQueueTimeout,
      interval: searchInterval,
    });

    client.emit(eventName, {
      event: eventName,
      type: ISocketEventType.INFO,
      data: {
        statusCode: HttpStatus.OK,
        message: 'You joined the queue.',
      } as ISocketMessage,
    } as ISocketEvent);
  }

  @SubscribeMessage('duel__leave_queue')
  async duelLeaveQueue(@ConnectedSocket() client: IAuthorizedSocket) {
    const eventName = 'duel__queue';

    if (this.duelQueue.find((user) => user.socket.userId === client.userId)) {
      const userFound = this.duelQueue.find(
        (user) => user.socket.userId === client.userId,
      );

      if (!userFound) return;

      clearTimeout(userFound.timeout);
      clearInterval(userFound.interval);

      this.duelQueue = this.duelQueue.filter(
        (user) => user.socket.userId !== client.userId,
      );

      client.emit(eventName, {
        event: 'duel__queue',
        type: ISocketEventType.INFO,
        data: {
          statusCode: HttpStatus.OK,
          message: 'You left the queue.',
        } as ISocketMessage,
      } as ISocketEvent);
      return;
    }

    client.emit(eventName, {
      event: eventName,
      type: ISocketEventType.ERROR,
      data: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'You are not in the queue.',
      } as ISocketMessage,
    } as ISocketEvent);
  }
}
