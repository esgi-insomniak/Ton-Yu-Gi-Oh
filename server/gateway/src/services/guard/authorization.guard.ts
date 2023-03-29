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
import { ITokenDecodeResponse } from 'src/interfaces/auth-service/token/token-response.interface';
import { IUserGetOneResponse } from 'src/interfaces/user-service/user/user-response.interface';

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

    const request = context.switchToHttp().getRequest();

    const userTokenInfo: ITokenDecodeResponse = await firstValueFrom(
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

    const userInfo: IUserGetOneResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', userTokenInfo.data.userId),
    );

    request.user = userInfo.user;
    return true;
  }
}
