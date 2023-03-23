import { ICard } from '../card/card.interface';

export interface ICardAttribute extends Document {
  id: string;
  cards: ICard[];
  name: string;
}
