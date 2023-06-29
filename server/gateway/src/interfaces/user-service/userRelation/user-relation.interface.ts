import { IUser } from '../user/user.interface';

export interface IUserRelation {
  id: string;
  isBlocked: boolean;
  relationOwner: IUser;
  targetUser: IUser;
}

export interface IUserRelationPartial {
  id: string;
  isBlocked: boolean;
  relationOwner: string;
  targetUser: string;
}
