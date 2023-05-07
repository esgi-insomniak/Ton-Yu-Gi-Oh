import { Socket } from 'socket.io';
import { IUser } from 'src/interfaces/user-service/user/user.interface';

export interface IAuthorizedSocket extends Socket {
  user?: IUser;
}
