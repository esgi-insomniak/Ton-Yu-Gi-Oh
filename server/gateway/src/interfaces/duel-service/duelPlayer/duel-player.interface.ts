import { IDuel } from '../duel/duel.interface';

export interface IDuelPlayer {
  id: string;
  userId: string;
  username: string;
  deckId: string;
  duel: IDuel | Partial<IDuel>;
  lifePoints: number;
  cardsInHand: string[];
  cardsInDeck: string[];
  cardsInField: string[];
}
