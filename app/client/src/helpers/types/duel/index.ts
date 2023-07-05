import { IUserCardSets } from "../cards";

export interface IDuel {
  id: string;
  roomId: string;
  hasStarted: boolean;
  isOver: boolean;
  turn: number;
  timePerTurn: number;
  winnerId: string;
  players: IDuelPlayer[] | Partial<IDuelPlayer>[];
}

export interface IDuelPlayer {
  id: string;
  userId: string;
  username: string;
  duel: IDuel | Partial<IDuel>;
  lifePoints: number;
  turnToPlay: boolean;
  cardsInHand: string[] | number;
  cardsInDeck: number;
  cardsInGraveyard: string[];
  cardsInField: {
    position: number;
    cardId: string;
    placedAtTurn: number;
    lifePoints: number;
    action: string;
  }
  deckUserCardSets: IUserCardSets[];
}
