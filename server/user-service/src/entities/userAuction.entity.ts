import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userCardSetId: string;

  @Column('date')
  createdAt: Date;

  @Column('numeric')
  duration: number;

  @Column('numeric')
  minimalPrice: number;

  @Column('numeric')
  currentPrice: number;

  @Column('boolean')
  isClosed: boolean;
}

@Entity()
export class AuctionHistory{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.auctionHistories, { onDelete: 'CASCADE' })
    userId: User;

    @OneToOne(() => Auction, (auction) => auction.id)
    auctionId: Auction;

    @Column('numeric')
    price: number;

    @Column('date')
    createdAt: Date;
}
