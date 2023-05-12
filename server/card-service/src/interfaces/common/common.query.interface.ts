import { QueryGetItems } from './common.response.interface';

export interface CardSetsQuery extends QueryGetItems {
  setCodes: string[];
  setId: string;
  archetypeId: string;
  attributeId: string;
  frameTypeId: string;
  raceId: string;
  typeId: string;
  rarityId: string;
}

export interface SetsQuery extends QueryGetItems {
  setCodes: string[];
  setId: string;
}
