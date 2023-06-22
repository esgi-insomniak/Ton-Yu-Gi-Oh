export interface ISocketEvent {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  object: any;
}
