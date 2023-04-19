import { Injectable } from '@nestjs/common';
import { Archetype } from 'src/entities/archetype.entity';
import { Attribute } from 'src/entities/attribute.entity';
import { Card } from 'src/entities/card.entity';
import { CardSet } from 'src/entities/cardSet.entity';
import { FrameType } from 'src/entities/frameType.entity';
import { LinkMarker } from 'src/entities/linkMarker.entity';
import { Price } from 'src/entities/price.entity';
import { Race } from 'src/entities/race.entity';
import { Rarity } from 'src/entities/rarity.entity';
import { Set } from 'src/entities/set.entity';
import { Type } from 'src/entities/type.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CardService {
  constructor(private readonly dataSource: DataSource) {}

  async getArchetypes(query: QueryGetItems): Promise<Archetype[]> {
    const archetypes = await this.dataSource.getRepository(Archetype).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return archetypes;
  }

  async getArchetypeById(id: string): Promise<Archetype> {
    const archetype = await this.dataSource.getRepository(Archetype).findOne({
      where: { id },
    });
    return archetype;
  }

  async getAttributes(query: QueryGetItems): Promise<Attribute[]> {
    const attributes = await this.dataSource.getRepository(Attribute).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return attributes;
  }

  async getAttributeById(id: string): Promise<Attribute> {
    const attribute = await this.dataSource.getRepository(Attribute).findOne({
      where: { id },
    });
    return attribute;
  }

  async getCards(query: QueryGetItems): Promise<Card[]> {
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

  async getFrameTypes(query: QueryGetItems): Promise<FrameType[]> {
    const frameTypes = await this.dataSource.getRepository(FrameType).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return frameTypes;
  }

  async getFrameTypeById(id: string): Promise<FrameType> {
    const frameType = await this.dataSource.getRepository(FrameType).findOne({
      where: { id },
    });
    return frameType;
  }

  async getLinkMarkers(query: QueryGetItems): Promise<LinkMarker[]> {
    const linkMarkers = await this.dataSource.getRepository(LinkMarker).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return linkMarkers;
  }

  async getLinkMarkerById(id: string): Promise<LinkMarker> {
    const linkMarker = await this.dataSource.getRepository(LinkMarker).findOne({
      where: { id },
    });
    return linkMarker;
  }

  async getPrices(query: QueryGetItems): Promise<Price[]> {
    const prices = await this.dataSource.getRepository(Price).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['card'],
    });
    return prices;
  }

  async getPriceById(id: string): Promise<Price> {
    const price = await this.dataSource.getRepository(Price).findOne({
      where: { id },
      relations: ['card'],
    });
    return price;
  }

  async getRaces(query: QueryGetItems): Promise<Race[]> {
    const races = await this.dataSource.getRepository(Race).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return races;
  }

  async getRaceById(id: string): Promise<Race> {
    const race = await this.dataSource.getRepository(Race).findOne({
      where: { id },
    });
    return race;
  }

  async getRarities(query: QueryGetItems): Promise<Rarity[]> {
    const rarities = await this.dataSource.getRepository(Rarity).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return rarities;
  }

  async getRarityById(id: string): Promise<Rarity> {
    const rarity = await this.dataSource.getRepository(Rarity).findOne({
      where: { id },
    });
    return rarity;
  }

  async getSets(query: QueryGetItems): Promise<Set[]> {
    const sets = await this.dataSource.getRepository(Set).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['cardSets'],
    });
    return sets;
  }

  async getSetById(id: string): Promise<Set> {
    const set = await this.dataSource.getRepository(Set).findOne({
      where: { id },
      relations: ['cardSets'],
    });
    return set;
  }

  async getTypes(query: QueryGetItems): Promise<Type[]> {
    const types = await this.dataSource.getRepository(Type).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return types;
  }

  async getTypeById(id: string): Promise<Type> {
    const type = await this.dataSource.getRepository(Type).findOne({
      where: { id },
    });
    return type;
  }
}
