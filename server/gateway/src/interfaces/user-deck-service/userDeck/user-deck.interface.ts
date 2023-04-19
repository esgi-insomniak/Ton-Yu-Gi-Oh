import { IUserCardSet } from '../userCardSet/user-card-set.interface';

export interface IUserDeck {
  id: string;
  userId: string;
  setId: string;
  cardSets: IUserCardSet[];
}
