import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Card)
  @JoinColumn({ name: 'cardId' })
  card: Card;

  @Column('double precision')
  cardMarketPrice: number;

  @Column('double precision')
  tcgPlayerPrice: number;

  @Column('double precision')
  ebayPrice: number;

  @Column('double precision')
  amazonPrice: number;

  @Column('double precision')
  coolStuffIncPrice: number;
}
