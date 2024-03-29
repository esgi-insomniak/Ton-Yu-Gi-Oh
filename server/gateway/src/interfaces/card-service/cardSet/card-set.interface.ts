import { ICard } from '../card/card.interface';
import { ICardRarity } from '../rarity/rarity.interface';
import { ICardSet } from '../set/set.interface';

export interface ICardCardSet {
  id: string;
  card: ICard;
  set: ICardSet;
  rarity: ICardRarity;
  price: number;
}
