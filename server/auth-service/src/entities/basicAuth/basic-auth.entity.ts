import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { lib } from 'crypto-js';

@Entity()
export class BasicAuth {
  constructor() {
    this.confirmationToken = lib.WordArray.random(128 / 8).toString();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  confirmationToken: string;

  @Column({ nullable: true })
  renewToken: string;
}
