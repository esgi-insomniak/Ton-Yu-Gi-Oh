import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  rewardCoinsAmount: number;

  @Column({ nullable: true })
  rewardSetId: string;

  @Column({ nullable: true })
  rewardSetAmount: number;

  @Column({ type: 'timestamptz', nullable: true })
  expirationDate: Date;
}
