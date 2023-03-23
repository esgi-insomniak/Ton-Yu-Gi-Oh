import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class LinkMarker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Card, (card) => card.linkMarkers)
  cards: Card[];

  @Column()
  name: string;
}
