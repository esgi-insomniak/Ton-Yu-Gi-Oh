import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RarityDropTable } from './rarityDropTable.entity';

@Entity()
export class Rarity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => RarityDropTable)
  dropTable: RarityDropTable;
}
