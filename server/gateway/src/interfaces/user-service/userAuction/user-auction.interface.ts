import { IUser } from '../user/user.interface';

export interface IAuction {
  id: string;
  cardSetId: string;
  createdAt: Date;
  duration: number;
  currentPrice: number;
  isClosed: boolean;
  winner?: IUser;
}
