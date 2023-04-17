import { Injectable } from '@nestjs/common';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { UserDeck } from 'src/entities/user-deck.entity';
import { UserSet } from 'src/entities/user-set.entity';
import {
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class UserDeckService {
  constructor(private readonly dataSource: DataSource) {}

  async getUserCardSets(query: QueryGetItems): Promise<UserCardSet[]> {
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return userCardSets;
  }

  async getUserCardSetById(id: string): Promise<UserCardSet> {
    const userCardSet = await this.dataSource.getRepository(UserCardSet).findOne({
      where: { id },
    });
    return userCardSet;
  }

  async getUserDecks(query: QueryGetItems): Promise<UserDeck[]> {
    const userDecks = await this.dataSource.getRepository(UserDeck).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return userDecks;
  }

  async getUserDeckById(id: string): Promise<UserDeck> {
    const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
      where: { id },
    });
    return userDeck;
  }

  async getUserSets(query: QueryGetItems): Promise<UserSet[]> {
    const userSets = await this.dataSource.getRepository(UserSet).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return userSets;
  }

  async getUserSetById(id: string): Promise<UserSet> {
    const userSet = await this.dataSource.getRepository(UserSet).findOne({
      where: { id },
    });
    return userSet;
  }
}
