import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Duel } from './duel.entity';

@Entity()
export class DuelPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  userId: string;

  @Column()
  username: string;

  @Column({ type: 'uuid', nullable: true })
  deckId: string;

  @ManyToOne(() => Duel, { onDelete: 'CASCADE' })
  duel: Duel;

  @Column({ nullable: false, default: 8000 })
  lifePoints: number;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  deckUserCardSets: string;

  @Column({ type: 'uuid', array: true, default: [] })
  cardsInHand: string[];

  @Column({ type: 'uuid', array: true, default: [] })
  cardsInDeck: string[];

  @Column('jsonb', { nullable: false, default: {} })
  cardsInField: {
    position: number;
    cardId: string;
    actionSetAtTurn: number;
    action: string;
    lifePoints: number;
  }[];
}
