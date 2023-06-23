import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @Column({ type: 'uuid', nullable: true })
  winnerId: string;

  @OneToMany(() => DuelPlayer, (duelPlayer) => duelPlayer.duel, {
    cascade: true,
  })
  players: DuelPlayer[];
}
