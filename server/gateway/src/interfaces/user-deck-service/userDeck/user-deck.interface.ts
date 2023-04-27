import {
  IUserCardSet,
  IUserCardSetPartial,
} from '../userCardSet/user-card-set.interface';

export interface IUserDeckPartial {
  id: string;
  userId: string;
  cardSets: IUserCardSetPartial[];
}

export interface IUserDeck {
  id: string;
  userId: string;
  cardSets: IUserCardSet[];
}
