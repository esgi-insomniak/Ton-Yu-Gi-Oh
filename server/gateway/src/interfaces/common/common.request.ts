import { IUser } from '../user-service/user/user.interface';

export interface IAuthorizedRequest extends Request {
  headers: Headers & {
    authorization: string;
  };
  user?: IUser;
}
