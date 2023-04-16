import { IUser } from '../user/user.interface';

export interface IUserDeck {
  id: string;
  user: IUser;
  setId: string;
}
