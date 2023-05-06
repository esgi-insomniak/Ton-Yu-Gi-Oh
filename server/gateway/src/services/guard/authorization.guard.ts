import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common/enums';
import { GetResponseOne } from 'src/interfaces/common/common.response';
import { IUser } from 'src/interfaces/user-service/user/user.interface';
import { IAuthorizedSocket } from 'src/interfaces/websocket/socket/socket.interface';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { WsException } from '@nestjs/websockets';
import { userInfo } from 'os';
import { ISocketMessage } from 'src/interfaces/websocket/socket-message/socket-message.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }
    if (context.getType() === 'http') {
      return await this.canActivateHttp(context);
    } else if (context.getType() === 'ws') {
      return await this.canActivateWs(context);
    }

    return false;
  }

  private async canActivateHttp(context: ExecutionContext): Promise<boolean> {
    const request: IAuthorizedRequest = context.switchToHttp().getRequest();

    const userTokenInfo: GetResponseOne<{ userId: string }> =
      await firstValueFrom(
        this.authServiceClient.send('token_decode', {
          token: request.headers.authorization,
        }),
      );

    if (userTokenInfo.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          statusCode: userTokenInfo.status,
          message: userTokenInfo.message,
        },
        userTokenInfo.status,
      );
    }

    const userInfo: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: userTokenInfo.item.userId,
      }),
    );

    if (userInfo.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          statusCode: userInfo.status,
          message: userInfo.message,
        },
        userInfo.status,
      );
    }

    request.user = userInfo.item;
    return true;
  }

  private async canActivateWs(context: ExecutionContext): Promise<boolean> {
    const socket: IAuthorizedSocket = context.switchToWs().getClient();

    const token =
      socket.handshake.auth.token || socket.handshake.headers['token'];

    const userTokenInfo: GetResponseOne<{ userId: string }> =
      await firstValueFrom(
        this.authServiceClient.send('token_decode', {
          token,
        }),
      );

    if (userTokenInfo.status !== HttpStatus.OK) {
      socket.send({
        statusCode: userTokenInfo.status,
        message: userTokenInfo.message,
      } as ISocketMessage);
      throw new WsException(userTokenInfo.message);
    }

    const userInfo: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: userTokenInfo.item.userId,
      }),
    );

    if (userInfo.status !== HttpStatus.OK) {
      socket.send({
        statusCode: userInfo.status,
        message: userTokenInfo.message,
      } as ISocketMessage);
      throw new WsException(userInfo.message);
    }

    socket.user = userInfo.item;
    return true;
  }
}
