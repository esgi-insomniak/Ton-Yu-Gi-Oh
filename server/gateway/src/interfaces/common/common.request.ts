import { IUser } from '../user-service/user/user.interface';

export interface IAuthorizedRequest extends Request {
  user?: IUser;
}
