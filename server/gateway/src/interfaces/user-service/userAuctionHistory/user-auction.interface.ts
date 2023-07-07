import { IUser } from '../user/user.interface';
import { IAuction } from '../userAuction/user-auction.interface';

export interface IAuctionHistory {
  id: string;
  user: IUser;
  auction?: IAuction;
  price: number;
  createdAt: Date;
}
