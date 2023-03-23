import { Card } from 'src/entities/card.entity';

export interface ICardGetResponse {
  cards: Card[];
}

export interface ICardGetOneResponse {
  card: Card;
}
