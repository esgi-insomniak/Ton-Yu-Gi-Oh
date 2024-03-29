import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentCheckout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  sessionId: string;

  @Column()
  paymentStatus: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  coins: number;
}
