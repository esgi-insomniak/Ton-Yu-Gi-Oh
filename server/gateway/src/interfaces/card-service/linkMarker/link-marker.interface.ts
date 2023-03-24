import { ICard } from '../card/card.interface';

export interface ICardLinkMarker extends Document {
  id: string;
  cards: ICard[];
  name: string;
}
