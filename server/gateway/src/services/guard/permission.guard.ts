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
import { IUserGetOneResponse } from 'src/interfaces/user-service/user/user-response.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<{
      roles: string[];
      areAuthorized: boolean;
    }>('permission', context.getHandler());

    if (!permission) {
      return true;
    }

    const request: IAuthorizedRequest = context.switchToHttp().getRequest();

    const userInfo: IUserGetOneResponse = await firstValueFrom(
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
        !userInfo.user.roles.some((role) => permission.roles.includes(role))
      ) {
        throw new HttpException(
          'User is not authorized to access this resource',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      if (userInfo.user.roles.some((role) => permission.roles.includes(role))) {
        throw new HttpException(
          'User is not authorized to access this resource',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    return true;
  }
}
