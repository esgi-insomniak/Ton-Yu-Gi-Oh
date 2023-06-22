import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserRelation } from './userRelation.entity';
import { UserExchange } from './userExchange.entity';
import { ProfilePicture } from './profilePicture.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column('text', { array: true })
  roles: string[];

  @Column({ default: 0 })
  coins: number;

  @ManyToOne(() => ProfilePicture, { nullable: true })
  profilePicture: ProfilePicture;

  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @OneToMany(() => UserRelation, (userRelation) => userRelation.relationOwner)
  userRelations: UserRelation[];

  @OneToMany(() => UserExchange, (userExchange) => userExchange.exchangeOwner)
  ownedExchanges: UserExchange[];

  @OneToMany(() => UserExchange, (userExchange) => userExchange.exchangeTarget)
  proposedExchanges: UserExchange[];

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

  getExchanges() {
    return [...this.ownedExchanges, ...this.proposedExchanges];
  }
}
