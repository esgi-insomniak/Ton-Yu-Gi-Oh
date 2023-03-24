import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Archetype {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Card, (card) => card.archetype)
  cards: Card[];

  @Column()
  name: string;
}
