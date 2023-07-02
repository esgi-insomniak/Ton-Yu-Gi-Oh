import { Injectable } from '@nestjs/common';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { GroupedUserCardSet } from 'src/interfaces/user-card-set.interface';
import { DataSource, DeepPartial, In } from 'typeorm';

@Injectable()
export class UserCardSetService {
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

  async getUserCardSetsByUserId(userId: string): Promise<UserCardSet[]> {
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { userId },
    });
    return userCardSets;
  }

  async getGroupedUserCardSetsByUserId(
    userId: string,
    query: QueryGetItems,
  ): Promise<GroupedUserCardSet[]> {
    const userCardSetsPartial = await this.dataSource
      .getRepository(UserCardSet)
      .createQueryBuilder('userCardSet')
      .select('userCardSet.cardSetId, COUNT(*) count')
      .where('userCardSet.userId = :userId', { userId })
      .groupBy('userCardSet.cardSetId')
      .take(query.limit || 10)
      .skip(query.offset * query.limit || 0)
      .getRawMany();

    const userCardSets: GroupedUserCardSet[] = await Promise.all(
      userCardSetsPartial.map(async (userCardSet) => ({
        cardSetId: userCardSet.cardSetId,
        userCardSets: await this.dataSource.getRepository(UserCardSet).find({
          where: { userId, cardSetId: userCardSet.cardSetId },
        }),
      })),
    );

    return userCardSets;
  }

  async getUsersIdsByCardSetId(
    cardSetId: string,
    query: QueryGetItems,
  ): Promise<string[]> {
    // find all users that have this card set
    // group by user id
    const userQuery = await this.dataSource
      .getRepository(UserCardSet)
      .createQueryBuilder('userCardSet')
      .select('userCardSet.userId userId')
      .where('userCardSet.cardSetId = :cardSetId', { cardSetId })
      .groupBy('userCardSet.userId')
      .take(query.limit || 10)
      .skip(query.offset * query.limit || 0)
      .getRawMany();

    return userQuery.map((userCardSet) => userCardSet.userid);
  }

  async getUserCardSetsByIds(ids: string[]): Promise<UserCardSet[]> {
    const usercardSets: UserCardSet[] = [];
    for (const id of ids) {
      const userCardSet = await this.dataSource
        .getRepository(UserCardSet)
        .findOne({
          where: { id },
        });
      if (userCardSet) {
        usercardSets.push(userCardSet);
      }
    }
    return usercardSets;
  }

  async getUserCardSetsByCardSetAndUserId(
    cardSetId: string,
    userId: string,
  ): Promise<UserCardSet[]> {
    const userCardSets = await this.dataSource.getRepository(UserCardSet).find({
      where: { cardSetId, userId },
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

  async updateUserCardSetOwner(query: {
    ids: string[];
    newOwnerId: string;
  }): Promise<UserCardSet[]> {
    const userCardSets = await this.dataSource
      .getRepository(UserCardSet)
      .update(
        {
          id: In(query.ids),
        },
        {
          userId: query.newOwnerId,
        },
      );

    if (userCardSets.affected > 0) {
      return await this.dataSource.getRepository(UserCardSet).find({
        where: { id: In(query.ids) },
      });
    }
    return null;
  }

  async createUserCardSetsByCardSetIds(query: {
    userId: string;
    cardSetIds: string[];
  }): Promise<UserCardSet[]> {
    const userCardSets: DeepPartial<UserCardSet>[] = query.cardSetIds.map(
      (cardSetId) => ({
        userId: query.userId,
        cardSetId,
      }),
    );

    return this.dataSource.getRepository(UserCardSet).save(userCardSets);
  }

  async deleteUserCardSetById(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(UserCardSet)
      .delete({ id });
    return deleteResult.affected > 0;
  }

  async deleteUserCardSetsByIds(ids: string[]): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(UserCardSet)
      .delete(ids);
    return deleteResult.affected > 0;
  }
}
