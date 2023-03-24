import { ICard } from '../card/card.interface';

export interface ICardFrameType extends Document {
  id: string;
  cards: ICard[];
  name: string;
}
