import { ICard } from '../card/card.interface';

export interface ICardFrameType {
  id: string;
  cards: ICard[];
  name: string;
}
