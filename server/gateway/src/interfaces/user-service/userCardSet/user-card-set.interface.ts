import { IUser } from '../user/user.interface';

export interface IUserCardSet {
  id: string;
  user: IUser;
  cardSetId: string;
}
