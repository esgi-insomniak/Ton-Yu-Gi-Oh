import { IUser } from './user.interface';

export interface IUserGetResponse {
  status: number;
  message?: string;
  users: IUser[];
}

export interface IUserGetOneResponse {
  status: number;
  message?: string;
  user: IUser;
}
