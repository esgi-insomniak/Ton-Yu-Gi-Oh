import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CardSet } from './cardSet.entity';

@Entity()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CardSet, (cardSet) => cardSet.set)
  cardSets: CardSet[];

  @Column({ default: 9 })
  cardSetsOnOpen: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  image: string;
}
