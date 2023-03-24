import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserCardSet } from './user-card-set.entity';
import { UserDeck } from './user-deck.entity';
import { UserSet } from './user-set.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: 0 })
  coins: number;

  @OneToMany(() => UserSet, (userSet) => userSet.user)
  sets: UserSet[];

  @OneToMany(() => UserCardSet, (userCardSet) => userCardSet.user)
  cardSets: UserCardSet[];

  @OneToMany(() => UserDeck, (userDeck) => userDeck.user)
  decks: UserDeck[];
}
