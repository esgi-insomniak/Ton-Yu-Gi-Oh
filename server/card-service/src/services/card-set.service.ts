import { Injectable } from '@nestjs/common';
import { CardSet } from 'src/entities/cardSet.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CardSetService {
  constructor(private readonly dataSource: DataSource) {}

  async getCardSets(query: QueryGetItems): Promise<CardSet[]> {
    const cardSets = await this.dataSource.getRepository(CardSet).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['card', 'set', 'rarity'],
    });
    return cardSets;
  }

  async getCardSetById(id: string): Promise<CardSet> {
    const cardSet = await this.dataSource.getRepository(CardSet).findOne({
      where: { id },
      relations: ['card', 'set', 'rarity'],
    });
    return cardSet;
  }

  async getCardSetsByIds(ids: string[]): Promise<CardSet[]> {
    const cardSets: CardSet[] = [];
    for (const id of ids) {
      const cardSet = await this.dataSource.getRepository(CardSet).findOne({
        where: { id },
        relations: ['card', 'set', 'rarity'],
      });
      cardSets.push(cardSet);
    }
    return cardSets;
  }
}
