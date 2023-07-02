import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Duel } from './duel.entity';

@Entity()
@Index(['userId', 'duel'], { unique: true })
export class DuelPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  username: string;

  @ManyToOne(() => Duel, { onDelete: 'CASCADE' })
  duel: Duel;

  @Column({ nullable: false, default: 8000 })
  lifePoints: number;

  @Column({ type: 'boolean', default: false })
  turnToPlay: boolean;

  @Column({ type: 'uuid', array: true, default: [] })
  cardsInHand: string[];

  @Column({ type: 'uuid', array: true, default: [] })
  cardsInDeck: string[];

  @Column({ type: 'uuid', array: true, default: [] })
  cardsInGraveyard: string[];

  @Column({ type: 'uuid', array: true, default: [] })
  cardsInField: string[];
}
