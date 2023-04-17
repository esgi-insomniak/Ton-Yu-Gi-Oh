import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

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
