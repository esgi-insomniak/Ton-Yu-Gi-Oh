import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rarity } from './rarity.entity';

@Entity()
export class RarityDropTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  rarityType: string;

  @Column()
  priority: number;

  @Column('double precision', { default: 0 })
  dropRate: number;

  @OneToMany(() => Rarity, (rarity) => rarity.dropTable)
  rarities: Rarity[];
}
