import { ICard } from '../card/card.interface';

export interface ICardPrice {
  id: string;
  card: ICard;
  cardMarketPrice: number;
  tcgPlayerPrice: number;
  ebayPrice: number;
  amazonPrice: number;
  coolStuffIncPrice: number;
}
