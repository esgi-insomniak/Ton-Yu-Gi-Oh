import { ICard } from '../card/card.interface';

export interface ICardRace {
  id: string;
  cards: ICard[];
  name: string;
}
