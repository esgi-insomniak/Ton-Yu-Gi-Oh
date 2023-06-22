import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { PromoCode } from './promoCode.entity';

@Entity()
@Index(['userId', 'promoCode'], { unique: true })
export class ClaimedPromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => PromoCode, { nullable: false, onDelete: 'CASCADE' })
  promoCode: PromoCode;
}
