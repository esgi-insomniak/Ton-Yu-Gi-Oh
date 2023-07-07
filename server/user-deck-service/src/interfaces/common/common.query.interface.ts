import { QueryGetItems } from './common.response.interface';

export interface UserCardSetsQuery extends QueryGetItems {
  setCodes: string[];
  setId: string;
  archetypeId: string;
  attributeId: string;
  frameTypeId: string;
  raceId: string;
  typeId: string;
  rarityId: string;
  limit: number;
  offset: number;
}
