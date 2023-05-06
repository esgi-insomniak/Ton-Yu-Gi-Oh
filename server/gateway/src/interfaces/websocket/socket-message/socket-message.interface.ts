import { HttpStatus } from '@nestjs/common';

export interface ISocketMessage {
  statusCode: HttpStatus;
  message: string;
}
