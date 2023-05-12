import { Injectable } from '@nestjs/common';
import { CardSet } from 'src/entities/cardSet.entity';
import { CardSetsQuery } from 'src/interfaces/common/common.query.interface';
import { DataSource, In } from 'typeorm';

@Injectable()
export class CardSetService {
  constructor(private readonly dataSource: DataSource) {}

  async getCardSets(query: CardSetsQuery): Promise<CardSet[]> {
    const cardSets = await this.dataSource.getRepository(CardSet).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      where: {
        set: {
          id: query.setId ? query.setId : null,
          code: query.setCodes ? In(query.setCodes) : null,
        },
        card: {
          archetype: { id: query.archetypeId ? query.archetypeId : null },
          attribute: { id: query.attributeId ? query.attributeId : null },
          frameType: { id: query.frameTypeId ? query.frameTypeId : null },
          race: { id: query.raceId ? query.raceId : null },
          type: { id: query.typeId ? query.typeId : null },
        },
        rarity: { id: query.rarityId ? query.rarityId : null },
      },
      relations: [
        'card',
        'set',
        'rarity',
        'card.type',
        'card.frameType',
        'card.race',
        'card.archetype',
        'card.attribute',
        'card.price',
        'card.linkMarkers',
      ],
    });
    return cardSets;
  }

  async getCardSetById(id: string): Promise<CardSet> {
    const cardSet = await this.dataSource.getRepository(CardSet).findOne({
      where: { id },
      relations: [
        'card',
        'set',
        'rarity',
        'card.type',
        'card.frameType',
        'card.race',
        'card.archetype',
        'card.attribute',
        'card.price',
        'card.linkMarkers',
      ],
    });
    return cardSet;
  }

  async getCardSetsByIds(
    ids: string[],
    query: CardSetsQuery,
  ): Promise<CardSet[]> {
    const cardSets: CardSet[] = [];
    for (const id of ids) {
      const cardSet = await this.dataSource.getRepository(CardSet).findOne({
        where: {
          id,
          set: {
            id: query.setId ? query.setId : null,
            code: query.setCodes ? In(query.setCodes) : null,
          },
          card: {
            archetype: { id: query.archetypeId ? query.archetypeId : null },
            attribute: { id: query.attributeId ? query.attributeId : null },
            frameType: { id: query.frameTypeId ? query.frameTypeId : null },
            race: { id: query.raceId ? query.raceId : null },
            type: { id: query.typeId ? query.typeId : null },
          },
          rarity: { id: query.rarityId ? query.rarityId : null },
        },
        relations: [
          'card',
          'set',
          'rarity',
          'card.type',
          'card.frameType',
          'card.race',
          'card.archetype',
          'card.attribute',
          'card.price',
          'card.linkMarkers',
        ],
      });
      if (cardSet) cardSets.push(cardSet);
    }
    return cardSets;
  }
}
