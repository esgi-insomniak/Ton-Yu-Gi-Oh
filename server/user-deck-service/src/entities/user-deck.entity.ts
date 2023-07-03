import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  Index,
} from 'typeorm';
import { UserCardSet } from './user-card-set.entity';

@Entity()
@Index(['userId', 'name'], { unique: true })
export class UserDeck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @ManyToMany(() => UserCardSet)
  @JoinTable({
    name: 'deck_cardSet',
    joinColumn: {
      name: 'userDeckId',
    },
    inverseJoinColumn: {
      name: 'userCardSetId',
    },
  })
  cardSets: UserCardSet[];
}
