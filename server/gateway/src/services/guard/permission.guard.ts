import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { GetResponseOne } from 'src/interfaces/common/common.response';
import { IUser } from 'src/interfaces/user-service/user/user.interface';
import { IAuthorizedSocket } from 'src/interfaces/websocket/socket/socket.interface';
import { WsException } from '@nestjs/websockets';
import { ISocketMessage } from 'src/interfaces/websocket/socket-message/socket-message.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      return await this.canActivateHttp(context);
    } else if (context.getType() === 'ws') {
      return await this.canActivateWs(context);
    }

    return false;
  }

  private async canActivateHttp(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<{
      roles: string[];
      areAuthorized: boolean;
    }>('permission', context.getHandler());

    if (!permission) {
      return true;
    }

    const request: IAuthorizedRequest = context.switchToHttp().getRequest();

    const userInfo: GetResponseOne<IUser> = await firstValueFrom(
      this.userService.send('get_user_by_id', {
        id: request.user.id,
      }),
    );

    if (userInfo.status !== HttpStatus.OK) {
      throw new HttpException(
        'Cannot verify user permission',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (permission.areAuthorized) {
      if (
        !userInfo.item.roles.some((role) => permission.roles.includes(role))
      ) {
        throw new HttpException(
          'User is not authorized to access this resource',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      if (userInfo.item.roles.some((role) => permission.roles.includes(role))) {
        throw new HttpException(
          'User is not authorized to access this resource',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    return true;
  }

  private async canActivateWs(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<{
      roles: string[];
      areAuthorized: boolean;
    }>('permission', context.getHandler());

    if (!permission) {
      return true;
    }

    const socket: IAuthorizedSocket = context.switchToWs().getClient();

    const userInfo: GetResponseOne<IUser> = await firstValueFrom(
      this.userService.send('get_user_by_id', {
        id: socket.userId,
      }),
    );

    if (userInfo.status !== HttpStatus.OK) {
      socket.send({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Cannot verify user permission',
      } as ISocketMessage);
      throw new WsException('Cannot verify user permission');
    }

    if (permission.areAuthorized) {
      if (
        !userInfo.item.roles.some((role) => permission.roles.includes(role))
      ) {
        socket.send({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'User is not authorized to access this resource',
        } as ISocketMessage);
        throw new WsException('User is not authorized to access this resource');
      }
    } else {
      if (userInfo.item.roles.some((role) => permission.roles.includes(role))) {
        socket.send({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'User is not authorized to access this resource',
        } as ISocketMessage);
        throw new WsException('User is not authorized to access this resource');
      }
    }

    return true;
  }
}
