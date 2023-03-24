import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class FrameType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Card, (card) => card.frameType)
  cards: Card[];

  @Column()
  name: string;
}
