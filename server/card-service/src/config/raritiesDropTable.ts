import { RarityDropTable } from 'src/entities/rarityDropTable.entity';
import { DeepPartial } from 'typeorm';

export const rarityDropTable: DeepPartial<RarityDropTable>[] = [
  {
    rarityType: 'common',
    priority: 1,
    dropRate: 100,
  },
  {
    rarityType: 'rare',
    priority: 2,
    dropRate: 100,
  },
  {
    rarityType: 'super',
    priority: 3,
    dropRate: 20,
  },
  {
    rarityType: 'ultra',
    priority: 4,
    dropRate: 8,
  },
  {
    rarityType: 'secret',
    priority: 5,
    dropRate: 4,
  },
  {
    rarityType: 'ghost',
    priority: 6,
    dropRate: 3,
  },
  {
    rarityType: 'starlight',
    priority: 7,
    dropRate: 2,
  },
  {
    rarityType: '10000',
    priority: 8,
    dropRate: 0.25,
  },
];

export const mappedRarities: Record<string, string[]> = {
  common: [
    'Common',
    'c',
    'Short Print',
    'Super Short Print',
    'Duel Terminal Normal Parallel Rare',
    'Normal Parallel Rare',
  ],
  rare: [
    'Rare',
    'Mosaic Rare',
    'Starfoil',
    'Starfoil Rare',
    'Shatterfoil Rare',
    'Duel Terminal Rare Parallel Rare',
    'Duel Terminal Normal Rare Parallel Rare',
  ],
  super: [
    'Super Rare',
    'Duel Terminal Super Parallel Rare',
    'Super Parallel Rare',
  ],
  ultra: [
    'Ultra Rare',
    "Ultra Rare (Pharaoh's Rare)",
    'Duel Terminal Ultra Parallel Rare',
    'Ultra Parallel Rare',
    'Ultimate Rare',
    'Gold Rare',
    'Premium Gold Rare',
    'Platinum Rare',
  ],
  secret: [
    'Secret Rare',
    'Gold Secret Rare',
    'Prismatic Secret Rare',
    "Collector's Rare",
    'Platinum Secret Rare',
    'QCScR',
    'Quarter Century Secret Rare',
    'Extra Secret',
    'Extra Secret Rare',
    'Ultra Secret Rare',
  ],
  ghost: ['Ghost Rare', 'Ghost/Gold Rare'],
  starlight: ['Starlight Rare'],
  '10000': ['10000 Secret Rare'],
};
