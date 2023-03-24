import { IUser } from '../user/user.interface';

export interface IUserDeck extends Document {
  id: string;
  user: IUser;
  setId: string;
}
