import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sessionId: string;

  @Column('uuid')
  userId: string;

  @Column()
  coinsAmount: number;

  @Column('simple-json')
  stripeInfo: string;
}
