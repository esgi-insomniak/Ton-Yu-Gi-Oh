import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class LinkMarker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Card)
  @JoinTable({
    name: 'card_linkMarker',
    joinColumn: {
      name: 'linkMarkerId',
    },
    inverseJoinColumn: {
      name: 'cardId',
    },
  })
  cards: Card[];

  @Column({ unique: true })
  name: string;
}
