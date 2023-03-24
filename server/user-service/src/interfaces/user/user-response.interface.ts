import { User } from 'src/entities/user.entity';

export interface IUserGetResponse {
  users: User[];
}

export interface IUserGetOneResponse {
  user: User;
}
