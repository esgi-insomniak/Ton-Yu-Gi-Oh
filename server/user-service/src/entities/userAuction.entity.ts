import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AuctionHistory } from './userAuctionHistory.entity';
import { User } from './user.entity';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  cardSetId: string;

  @OneToMany(() => AuctionHistory, (auctionHistory) => auctionHistory.auction)
  auctionHistories: AuctionHistory[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('numeric')
  duration: number;

  @Column('numeric')
  currentPrice: number;

  @ManyToOne(() => User, (user) => user.wonAuctions)
  winner: User;

  @Column('boolean', { default: false })
  isClosed: boolean;
}
