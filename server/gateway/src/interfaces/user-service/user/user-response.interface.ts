import { IUser } from './user.interface';

export interface IUserGetResponse {
  users: IUser[];
}

export interface IUserGetOneResponse {
  user: IUser;
}
