import { IUser } from '../user/user.interface';

export interface IUserCardSet extends Document {
  id: string;
  user: IUser;
  cardSetId: string;
}
