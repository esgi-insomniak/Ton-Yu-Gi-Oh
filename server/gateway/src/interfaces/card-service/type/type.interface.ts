import { ICard } from '../card/card.interface';

export interface ICardType {
  id: string;
  cards: ICard[];
  name: string;
}
