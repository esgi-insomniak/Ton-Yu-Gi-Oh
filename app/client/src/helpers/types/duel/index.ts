import { IUserCardSet } from "../cards";

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

export interface IDuelCardInField {
  position: number;
  userCardSet: IUserCardSet;
  placedAtTurn?: number;
  lifePoints?: number;
  action: string;
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
  cardsInField: IDuelCardInField[];
  deckUserCardSets: IUserCardSet[];
}
