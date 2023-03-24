import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Card, (card) => card.type)
  cards: Card[];

  @Column()
  name: string;
}
