import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
