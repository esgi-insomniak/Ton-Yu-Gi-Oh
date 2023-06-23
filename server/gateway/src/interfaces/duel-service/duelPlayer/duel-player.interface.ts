import { IDuel } from '../duel/duel.interface';

export interface IDuelPlayer {
  id: string;
  userId: string;
  username: string;
  duel: IDuel | Partial<IDuel>;
  lifePoints: number;
  turnToPlay: boolean;
  cardsInHand: string[];
  cardsInDeck: string[];
  cardsInGraveyard: string[];
  cardsInField: string[];
}
