import { ICard } from '../card/card.interface';

export interface ICardAttribute {
  id: string;
  cards: ICard[];
  name: string;
}
