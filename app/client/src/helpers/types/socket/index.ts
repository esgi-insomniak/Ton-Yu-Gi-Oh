export enum ISocketEventType {
  INFO = 'INFO',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ERROR = 'ERROR',
}

export interface ISocketEvent {
  event: string;
  type: keyof typeof ISocketEventType;
  data: any;
}

export interface ISocketMessage {
  statusCode: number;
  message: string | string[];
}