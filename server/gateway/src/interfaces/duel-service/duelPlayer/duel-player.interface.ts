import { IUserCardSet } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';
import { IDuel } from '../duel/duel.interface';

export type IDuelCardInFieldAction = 'ATK' | 'DEF' | 'PLR_ATK';

export interface IDuelCardInField {
  position?: number;
  userCardSet: IUserCardSet;
  actionSetAtTurn?: number;
  action: IDuelCardInFieldAction;
  lifePoints?: number;
}

export interface IDuelPlayer {
  id: string;
  userId: string;
  username: string;
  deckId: string;
  duel: IDuel | Partial<IDuel>;
  lifePoints: number;
  deckUserCardSets: IUserCardSet[];
  cardsInHand: string[] | number;
  cardsInDeck: string[] | number;
  cardsInField: IDuelCardInField[];
}
