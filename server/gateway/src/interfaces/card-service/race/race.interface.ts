import { ICard } from '../card/card.interface';

export interface ICardRace extends Document {
  id: string;
  cards: ICard[];
  name: string;
}
