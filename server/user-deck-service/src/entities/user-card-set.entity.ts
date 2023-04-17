import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserDeck } from './user-deck.entity';

@Entity()
export class UserCardSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  cardSetId: string;

  @ManyToMany(() => UserDeck)
  @JoinTable({
    name: 'deck_cardSet',
    joinColumn: {
      name: 'userCardSetId',
    },
    inverseJoinColumn: {
      name: 'userDeckId',
    },
  })
  decks: UserDeck[];
}
