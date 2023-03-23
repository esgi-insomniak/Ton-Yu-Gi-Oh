import { ICardCardSet } from '../cardSet/card-set.interface';

export interface ICardSet extends Document {
  id: string;
  cardSets: ICardCardSet[];
  name: string;
  code: string;
  image: string;
}
