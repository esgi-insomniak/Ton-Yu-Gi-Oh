import { ICard } from '../card/card.interface';

export interface ICardLinkMarker {
  id: string;
  cards: ICard[];
  name: string;
}
