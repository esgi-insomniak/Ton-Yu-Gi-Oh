import { ICard } from '../card/card.interface';

export interface ICardArchetype {
  id: string;
  cards?: ICard[];
  name: string;
}
