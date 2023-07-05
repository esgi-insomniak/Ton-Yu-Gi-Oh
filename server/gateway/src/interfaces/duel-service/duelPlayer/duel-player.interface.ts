import { IUserCardSet } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';
import { IDuel } from '../duel/duel.interface';

export interface IDuelPlayer {
  id: string;
  userId: string;
  username: string;
  deckId: string;
  duel: IDuel | Partial<IDuel>;
  lifePoints: number;
  deckUserCardSets: IUserCardSet[];
  cardsInHand: string[];
  cardsInDeck: string[];
  cardsInField: string[];
}
