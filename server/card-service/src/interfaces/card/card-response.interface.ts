import { Card } from 'src/entities/card.entity';

export interface ICardGetResponse {
  status: number;
  message?: string;
  cards: Card[];
}

export interface ICardGetOneResponse {
  status: number;
  message?: string;
  card: Card;
}
