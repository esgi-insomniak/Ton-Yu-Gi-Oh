import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';
import { IUserDeck } from '../userDeck/user-deck.interface';

export interface IUserCardSetPartial {
  id: string;
  userId: string;
  cardSetId: string;
  decks: IUserDeck[];
}
export interface IUserCardSet {
  id: string;
  userId: string;
  cardSet: ICardCardSet;
  decks?: IUserDeck[];
}

export interface IGroupedUserCardSet {
  cardSetId: string;
  userCardSets: IUserCardSet[];
}

export interface IGroupedUserCardSetPartial {
  cardSetId: string;
  userCardSets: IUserCardSetPartial[];
}
