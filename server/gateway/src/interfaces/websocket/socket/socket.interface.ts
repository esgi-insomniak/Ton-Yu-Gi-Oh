import { Socket } from 'socket.io';

export interface IAuthorizedSocket extends Socket {
  userId: string;
}
