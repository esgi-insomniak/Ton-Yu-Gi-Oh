import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DuelPlayer } from './duelPlayer.entity';

@Entity()
export class Duel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roomId: string;

  @Column({ type: 'boolean', default: false })
  hasStarted: boolean;

  @Column({ type: 'boolean', default: false })
  isOver: boolean;

  @Column({ default: 90 })
  timePerTurn: number;

  @Column({ default: 30 })
  timeToSelectDeck: number;

  @Column({ type: 'uuid', nullable: true })
  playerToPlay: string;

  @Column({ type: 'uuid', nullable: true })
  winner: string;

  @OneToMany(() => DuelPlayer, (duelPlayer) => duelPlayer.duel, {
    cascade: true,
  })
  players: DuelPlayer[];
}
