import { Injectable } from '@nestjs/common';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

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
}
