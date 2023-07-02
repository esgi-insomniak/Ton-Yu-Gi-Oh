import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Entity()
export class BasicAuth {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  confirmationToken: string;

  @Column({ nullable: true })
  renewToken: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeInsert()
  createConfirmationToken() {
    if (!this.confirmationToken) {
      this.confirmationToken = randomBytes(48).toString('hex');
    }
  }

  generateRenewToken() {
    this.renewToken = randomBytes(48).toString('hex');
  }

  changePassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }
}
