import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Index(['relationOwner', 'targetUser'], { unique: true })
export class UserRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  isBlocked: boolean;

  @ManyToOne(() => User, (user) => user.userRelations, { onDelete: 'CASCADE' })
  relationOwner: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  targetUser: User;
}
