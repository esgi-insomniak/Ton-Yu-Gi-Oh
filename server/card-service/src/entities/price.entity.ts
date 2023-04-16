import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  @OneToOne(() => Card)
  @JoinColumn()
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
