import { IUserCardSet } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';
import { IUser } from '../user/user.interface';

export interface IUserExchange {
  id: string;
  exchangeOwner: IUser;
  exchangeTarget: IUser;
  ownerAccepted: boolean;
  targetAccepted: boolean;
  isClosed: boolean;
  ownerCoinsProposed: number;
  targetCoinsProposed: number;
  ownerCardSetsProposed: IUserCardSet[];
  targetCardSetsProposed: IUserCardSet[];
}

export interface IUserExchangePartial {
  id: string;
  exchangeOwner: IUser;
  exchangeTarget: IUser;
  ownerAccepted: boolean;
  targetAccepted: boolean;
  isClosed: boolean;
  ownerCoinsProposed: number;
  targetCoinsProposed: number;
  ownerCardSetsProposed: string[];
  targetCardSetsProposed: string[];
}
