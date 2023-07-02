import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserExchange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.ownedExchanges, { onDelete: 'CASCADE' })
  exchangeOwner: User;

  @ManyToOne(() => User, (user) => user.proposedExchanges, { onDelete: 'CASCADE' })
  exchangeTarget: User;

  @Column({ type: 'boolean', default: false })
  ownerAccepted: boolean;

  @Column({ type: 'boolean', default: false })
  targetAccepted: boolean;

  @Column({ type: 'boolean', default: false })
  isClosed: boolean;

  @Column({ default: 0 })
  ownerCoinsProposed: number;

  @Column({ default: 0 })
  targetCoinsProposed: number;

  @Column('uuid', { array: true })
  ownerCardSetsProposed: string[];

  @Column('uuid', { array: true })
  targetCardSetsProposed: string[];
}
