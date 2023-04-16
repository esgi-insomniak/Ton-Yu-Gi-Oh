import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rarity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;
}
