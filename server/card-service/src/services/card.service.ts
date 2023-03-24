import { Injectable } from '@nestjs/common';
import { Card } from 'src/entities/card.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CardService {
  constructor(private dataSource: DataSource) {}

  async getCards(query: { limit: number; offset: number }): Promise<Card[]> {
    const typeRepository = this.dataSource.getRepository(Card);
    const cards = await typeRepository.find({
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
    const cardRepository = this.dataSource.getRepository(Card);
    const card = await cardRepository.findOne({
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
