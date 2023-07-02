import { ICardCardSet } from '../cardSet/card-set.interface';

export interface ICardSet {
  id: string;
  cardSets: ICardCardSet[];
  cardSetsOnOpen: number;
  name: string;
  code: string;
  image: string;
}
