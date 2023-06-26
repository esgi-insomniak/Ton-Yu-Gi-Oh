import { ICardRarity } from '../rarity/rarity.interface';

export interface ICardRarityDropTable {
  id: string;
  rarityType: string;
  priority: number;
  dropRate: number;
  rarities: ICardRarity[];
}
