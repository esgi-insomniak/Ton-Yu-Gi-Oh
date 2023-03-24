import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserCardSet } from './user-card-set.entity';
import { User } from './user.entity';

@Entity()
export class UserDeck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.decks)
  user: User;

  @ManyToMany(() => UserCardSet)
  @JoinTable({
    name: 'deck_card_set',
    joinColumn: {
      name: 'deck_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userCardSet_id',
      referencedColumnName: 'id',
    },
  })
  cardSets: UserCardSet[];
}
