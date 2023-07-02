import { ICardSet } from 'src/interfaces/card-service/set/set.interface';

export interface IUserSetPartial {
  id: string;
  userId: string;
  setId: string;
}

export interface IUserSet {
  id: string;
  userId: string;
  set: ICardSet;
}
