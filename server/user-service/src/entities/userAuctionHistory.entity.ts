import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Auction } from './userAuction.entity';

@Entity()
export class AuctionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.auctionHistories, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Auction, { onDelete: 'CASCADE' })
  auction: Auction;

  @Column('numeric')
  price: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
