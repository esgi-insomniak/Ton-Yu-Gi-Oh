import { IUser } from '../user/user.interface';

export interface IUserSet extends Document {
  id: string;
  user: IUser;
  setId: string;
}
