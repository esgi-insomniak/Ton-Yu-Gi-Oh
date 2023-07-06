import { HttpStatus, INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from './services/config/config.service';
import { ClientProxy } from '@nestjs/microservices';
import { Server, ServerOptions } from 'socket.io';
import { GetResponseOne } from './interfaces/common/common.response';
import { firstValueFrom } from 'rxjs';
import { IAuthorizedSocket } from './interfaces/websocket/socket/socket.interface';
import { NextFunction } from 'express';
import { IUser } from './interfaces/user-service/user/user.interface';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplicationContext,
    private readonly configService = app.get(ConfigService),
    private readonly authServiceClient = app.get<ClientProxy>('AUTH_SERVICE'),
    private readonly userServiceClient = app.get<ClientProxy>('USER_SERVICE'),
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const cors = { origin: new ConfigService().get('corsOrigin') };

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors,
    };

    const server: Server = super.createIOServer(port, optionsWithCORS);

    server.use(this.createTokenMiddleware);

    return server;
  }

  createTokenMiddleware = async (
    socket: IAuthorizedSocket,
    next: NextFunction,
  ) => {
    const token =
      socket.handshake.auth.token || socket.handshake.headers['token'];

    const userTokenResponse: GetResponseOne<{ userId: string }> =
      await firstValueFrom(
        this.authServiceClient.send('token_decode', {
          token,
        }),
      );

    if (userTokenResponse.status !== HttpStatus.OK) {
      return next(new Error('Unauthorized'));
    }

    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: userTokenResponse.item.userId,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      return next(new Error('Unauthorized'));
    }

    socket.userId = userResponse.item.id;
    socket.username = userResponse.item.username;

    return next();
  };
}
