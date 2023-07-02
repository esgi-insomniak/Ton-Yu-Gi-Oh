import { ICardRarityDropTable } from '../rarityDropTable/rarity-drop-table.interface';

export interface ICardRarity {
  id: string;
  name: string;
  code: string;
  dropTable: ICardRarityDropTable;
}
