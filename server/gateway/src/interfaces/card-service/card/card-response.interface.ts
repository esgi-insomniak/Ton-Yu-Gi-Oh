import { ICard } from './card.interface';

export interface ICardGetResponse {
  cards: ICard[];
}

export interface ICardGetOneResponse {
  card: ICard;
}
