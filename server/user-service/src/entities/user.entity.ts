import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { UserCardSet } from './user-card-set.entity';
import { UserDeck } from './user-deck.entity';
import { UserSet } from './user-set.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column('text', { array: true })
  roles: string[];

  @Column({ default: 0 })
  coins: number;

  @OneToMany(() => UserSet, (userSet) => userSet.user)
  sets: UserSet[];

  @OneToMany(() => UserCardSet, (userCardSet) => userCardSet.user)
  cardSets: UserCardSet[];

  @OneToMany(() => UserDeck, (userDeck) => userDeck.user)
  decks: UserDeck[];

  @BeforeInsert()
  setDefaultRoles() {
    if (!this.roles) {
      this.roles = ['user'];
    }
  }

  addRole(role: string) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  removeRole(role: string) {
    this.roles = this.roles.filter((r) => r !== role);
  }

  setRoles(roles: string[]) {
    this.roles = roles;
  }
}
