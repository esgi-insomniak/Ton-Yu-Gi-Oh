import { Injectable } from '@nestjs/common';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { UserDeck } from 'src/entities/user-deck.entity';
import { UserSet } from 'src/entities/user-set.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource, In } from 'typeorm';

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
    const userCardSet = await this.dataSource
      .getRepository(UserCardSet)
      .findOne({
        where: { id },
      });
    return userCardSet;
  }

  async getUserCardSetsByUserId(
    userId: string,
    query: QueryGetItems,
  ): Promise<UserCardSet[]> {
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { userId },
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return userCardSets;
  }

  async createUserCardSet(query: {
    userId: string;
    cardSetId: string;
  }): Promise<UserCardSet> {
    const userCardSet = this.dataSource.getRepository(UserCardSet).create({
      userId: query.userId,
      cardSetId: query.cardSetId,
    });
    return this.dataSource.getRepository(UserCardSet).save(userCardSet);
  }

  async deleteUserCardSetById(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(UserCardSet)
      .delete({ id });
    return deleteResult.affected > 0;
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

  async addCardSetsToDeck(query: {
    userId: string;
    deckId: string;
    cardSetIds: string[];
  }): Promise<UserDeck> {
    const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
      where: { id: query.deckId, userId: query.userId },
    });
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { id: In(query.cardSetIds), userId: query.userId },
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
    cardSetIds: string[];
  }): Promise<UserDeck> {
    const userDeck = await this.dataSource.getRepository(UserDeck).findOne({
      where: { id: query.deckId, userId: query.userId },
    });
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { id: In(query.cardSetIds), userId: query.userId },
    });

    // remove cardSets in deck
    userDeck.cardSets = userDeck.cardSets.filter((userCardSet) =>
      userCardSets.find(
        (userDeckCardSet) => userDeckCardSet.id === userCardSet.id,
      ),
    );
    return this.dataSource.getRepository(UserDeck).save(userDeck);
  }

  async createUserDeck(query: {
    userId: string;
    cardSetIds: string[];
  }): Promise<UserDeck> {
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { id: In(query.cardSetIds), userId: query.userId },
    });
    const userDeck = this.dataSource.getRepository(UserDeck).create({
      userId: query.userId,
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

  async createUserSet(query: {
    userId: string;
    setId: string;
  }): Promise<UserSet> {
    const userSet = this.dataSource.getRepository(UserSet).create({
      userId: query.userId,
      setId: query.setId,
    });
    return this.dataSource.getRepository(UserSet).save(userSet);
  }

  async deleteUserSetById(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(UserSet)
      .delete({ id });

    return deleteResult.affected > 0;
  }
}
