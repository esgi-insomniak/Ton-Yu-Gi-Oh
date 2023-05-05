import { Socket } from 'socket.io';

// guard types
export type AuthPayload = {
  userId: string;
  socketId: string;
  name: string;
};

export type RequestWithAuth = Request & AuthPayload;

export type SocketWithAuth = Socket & AuthPayload;
