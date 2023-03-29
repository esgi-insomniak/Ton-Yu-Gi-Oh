import { User } from 'src/entities/user.entity';

export interface IUserGetResponse {
  status: number;
  message?: string;
  users: User[];
}

export interface IUserGetOneResponse {
  status: number;
  message?: string;
  user: User;
}
