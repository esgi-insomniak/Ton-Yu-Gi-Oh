import { Injectable } from '@nestjs/common';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { UserDeck } from 'src/entities/user-deck.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource, In } from 'typeorm';

@Injectable()
export class UserDeckService {
  constructor(private readonly dataSource: DataSource) {}

  async getUserDecks(query: QueryGetItems): Promise<UserDeck[]> {
    const userDecks = await this.dataSource.getRepository(UserDeck).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['cardSets'],
    });
    return userDecks;
  }

  async getUserDecksByUserId(
    userId: string,
    query: QueryGetItems,
  ): Promise<UserDeck[]> {
    const userDecks = await this.dataSource.getRepository(UserDeck).find({
      where: { userId },
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['cardSets'],
    });
    return userDecks;
  }

  async getUserDecksByUserCardSetId(id: string): Promise<UserDeck[]> {
    const userDecks = await this.dataSource.getRepository(UserDeck).find({
      where: { cardSets: { id } },
      relations: ['cardSets'],
    });
    return userDecks;
  }

  async getUserDecksByUserCardIds(ids: string[]): Promise<UserDeck[]> {
    const userDecks = await this.dataSource.getRepository(UserDeck).find({
      where: { cardSets: { id: In(ids) } },
      relations: ['cardSets'],
    });
    return userDecks;
  }

  async getUserDeckById(id: string): Promise<UserDeck> {
    const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
      where: { id },
      relations: ['cardSets'],
    });
    return userDeck;
  }

  async addCardSetsToDeck(query: {
    userId: string;
    deckId: string;
    userCardSetsIds: string[];
  }): Promise<UserDeck> {
    const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
      where: { id: query.deckId, userId: query.userId },
    });
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { id: In(query.userCardSetsIds), userId: query.userId },
    });

    // add cardSets not already in deck
    userDeck.cardSets = userDeck.cardSets.concat(
      userCardSets.filter(
        (userCardSet) =>
          !userDeck.cardSets.find(
            (userDeckCardSet) => userDeckCardSet.id === userCardSet.id,
          ),
      ),
    );
    return this.dataSource.getRepository(UserDeck).save(userDeck);
  }

  async removeCardSetsFromDeck(query: {
    userId: string;
    deckId: string;
    userCardSetsIds: string[];
  }): Promise<UserDeck> {
    const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
      where: { id: query.deckId, userId: query.userId },
    });
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { id: In(query.userCardSetsIds), userId: query.userId },
    });

    // remove cardSets in deck
    userDeck.cardSets = userDeck.cardSets.filter((userCardSet) =>
      userCardSets.find(
        (userDeckCardSet) => userDeckCardSet.id === userCardSet.id,
      ),
    );
    return this.dataSource.getRepository(UserDeck).save(userDeck);
  }

  async updateUserDeckById(
    id: string,
    body: {
      name?: string;
      userCardSetIds?: string[];
    },
  ): Promise<UserDeck> {
    try {
      const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
        where: { id },
      });
      const userCardSets = await this.dataSource
        .getRepository(UserCardSet)
        .find({
          where: { id: In(body.userCardSetIds) },
        });

      userDeck.name = body.name;
      userDeck.cardSets = userCardSets;

      return await this.dataSource.getRepository(UserDeck).save(userDeck);
    } catch {
      return null;
    }
  }

  async createUserDeck(query: {
    userId: string;
    name: string;
    userCardSetsIds: string[];
  }): Promise<UserDeck> {
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { id: In(query.userCardSetsIds), userId: query.userId },
    });
    const userDeck = this.dataSource.getRepository(UserDeck).create({
      userId: query.userId,
      name: query.name,
      cardSets: userCardSets,
    });
    return this.dataSource.getRepository(UserDeck).save(userDeck);
  }

  async deleteUserDeckById(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(UserDeck)
      .delete({ id });
    return deleteResult.affected > 0;
  }
}
