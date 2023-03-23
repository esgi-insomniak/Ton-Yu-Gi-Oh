import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rarity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;
}
