import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  token: string;
}
