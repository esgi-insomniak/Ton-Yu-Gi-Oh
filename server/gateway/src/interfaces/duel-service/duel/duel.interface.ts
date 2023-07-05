import { IDuelPlayer } from '../duelPlayer/duel-player.interface';

export interface IDuel {
  id: string;
  roomId: string;
  hasStarted: boolean;
  isOver: boolean;
  turn: number;
  timePerTurn: number;
  timeToSelectDeck: number;
  playerToPlay: string;
  winner: string;
  players: IDuelPlayer[] | Partial<IDuelPlayer>[];
}
