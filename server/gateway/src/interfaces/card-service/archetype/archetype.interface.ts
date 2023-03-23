import { ICard } from '../card/card.interface';

export interface ICardArchetype extends Document {
  id: string;
  cards: ICard[];
  name: string;
}
