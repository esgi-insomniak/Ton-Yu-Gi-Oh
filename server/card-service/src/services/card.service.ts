import { Injectable } from '@nestjs/common';
import { Card } from 'src/entities/card.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CardService {
  constructor(private readonly dataSource: DataSource) {}

  async getCards(query: { limit: number; offset: number }): Promise<Card[]> {
    const cards = await this.dataSource.getRepository(Card).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: [
        'type',
        'frameType',
        'race',
        'archetype',
        'attribute',
        'price',
        'cardSets',
        'linkMarkers',
      ],
    });
    return cards;
  }

  async getCardById(id: string): Promise<Card> {
    const card = await this.dataSource.getRepository(Card).findOne({
      where: { id },
      relations: [
        'type',
        'frameType',
        'race',
        'archetype',
        'attribute',
        'price',
        'cardSets',
        'linkMarkers',
      ],
    });
    return card;
  }
}
