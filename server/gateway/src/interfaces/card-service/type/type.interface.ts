import { ICard } from '../card/card.interface';

export interface ICardType extends Document {
  id: string;
  cards: ICard[];
  name: string;
}
