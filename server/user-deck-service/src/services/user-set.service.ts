import { Injectable } from '@nestjs/common';
import { UserSet } from 'src/entities/user-set.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource, DeepPartial } from 'typeorm';

@Injectable()
export class UserSetService {
  constructor(private readonly dataSource: DataSource) {}

  async getUserSets(query: QueryGetItems): Promise<UserSet[]> {
    const userSets = await this.dataSource.getRepository(UserSet).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return userSets;
  }

  async getUserSetsByUserId(
    userId: string,
    query: QueryGetItems,
  ): Promise<UserSet[]> {
    const userSets = await this.dataSource.getRepository(UserSet).find({
      where: { userId },
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

  async createUserSets(query: {
    userId: string;
    setId: string;
    amount: number;
  }): Promise<UserSet[]> {
    const userSets: DeepPartial<UserSet>[] = [];

    for (let i = 0; i < query.amount; i++) {
      const userSet = this.dataSource.getRepository(UserSet).create({
        userId: query.userId,
        setId: query.setId,
      });
      userSets.push(userSet);
    }

    return this.dataSource.getRepository(UserSet).save(userSets);
  }

  async deleteUserSetById(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(UserSet)
      .delete({ id });

    return deleteResult.affected > 0;
  }
}
