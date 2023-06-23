export enum ISocketEventMethod {
  GET = 'GET',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface ISocketEvent {
  event: string;
  method: keyof typeof ISocketEventMethod;
  data: any;
}
