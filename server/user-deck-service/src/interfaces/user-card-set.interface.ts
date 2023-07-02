import { UserCardSet } from 'src/entities/user-card-set.entity';

export interface GroupedUserCardSet {
  cardSetId: string;
  userCardSets: UserCardSet[];
}
