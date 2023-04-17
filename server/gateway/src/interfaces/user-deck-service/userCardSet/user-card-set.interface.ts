import { IUserDeck } from '../userDeck/user-deck.interface';

export interface IUserCardSet {
  id: string;
  userId: string;
  cardSetId: string;
  decks: IUserDeck[];
}
