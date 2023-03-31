import { ICard } from './card.interface';

export interface ICardGetResponse {
  status: number;
  message?: string;
  cards: ICard[];
}

export interface ICardGetOneResponse {
  status: number;
  message?: string;
  card: ICard;
}
