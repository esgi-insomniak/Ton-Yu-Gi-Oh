export interface IDuel {
  id: string;
  roomId: string;
  hasStarted: boolean;
  isOver: boolean;
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
  cardsInHand: string[];
  cardsInDeck: string[];
  cardsInGraveyard: string[];
  cardsInField: string[];
}
