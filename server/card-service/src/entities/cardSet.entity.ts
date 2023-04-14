import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Set } from './set.entity';
import { Rarity } from './rarity.entity';

@Entity()
@Index(['card', 'set'], { unique: true })
export class CardSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  @ManyToOne(() => Card, (card) => card.cardSets)
  @JoinColumn()
  card: Card;

  @PrimaryColumn('uuid')
  @ManyToOne(() => Set, (set) => set.cardSets)
  @JoinColumn()
  set: Set;

  @ManyToOne(() => Rarity)
  rarity: Rarity;

  @Column('double precision')
  price: number;
}
