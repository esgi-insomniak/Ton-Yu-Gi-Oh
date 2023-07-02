import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Card, (card) => card.attribute)
  cards: Card[];

  @Column({ unique: true })
  name: string;
}
