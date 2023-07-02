import { IUser } from 'src/interfaces/user-service/user/user.interface';

export interface ILoginHistory {
  id: string;
  ipAddress: string;
  user?: IUser;
  isSuccess: boolean;
  createdAt: Date;
}

export interface ILoginHistoryPartial {
  id: string;
  ipAddress: string;
  userId?: string;
  isSuccess: boolean;
  createdAt: Date;
}
