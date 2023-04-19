import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  setId: string;
}
