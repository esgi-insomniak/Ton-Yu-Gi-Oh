import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { CardSet } from './cardSet.entity';
import { Archetype } from './archetype.entity';
import { Attribute } from './attribute.entity';
import { FrameType } from './frameType.entity';
import { LinkMarker } from './linkMarker.entity';
import { Price } from './price.entity';
import { Race } from './race.entity';
import { Type } from './type.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  identifiant: number;

  @ManyToOne(() => Type)
  type: Type;

  @ManyToOne(() => FrameType)
  frameType: FrameType;

  @ManyToOne(() => Race)
  race: Race;

  @ManyToOne(() => Archetype, { nullable: true })
  archetype: Archetype;

  @ManyToOne(() => Attribute, { nullable: true })
  attribute: Attribute;

  @OneToOne(() => Price)
  @JoinColumn({ name: 'priceId' })
  price: Price;

  @OneToMany(() => CardSet, (cardSet) => cardSet.card)
  cardSets: CardSet[];

  @ManyToMany(() => LinkMarker)
  @JoinTable({
    name: 'card_link_marker',
    joinColumn: {
      name: 'card_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'linkMarker_id',
      referencedColumnName: 'id',
    },
  })
  linkMarkers: LinkMarker[];

  @Column()
  name: string;

  @Column()
  enName: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  atk: number;

  @Column({ nullable: true })
  def: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  scale: number;

  @Column({ nullable: true })
  linkVal: number;

  @Column()
  imageUrl: string;

  @Column()
  imageUrlSmall: string;
}
