import { Injectable } from '@nestjs/common';
import { UserRelation } from 'src/entities/userRelation.entity';
import {
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserRelationService {
  private userRelationRepository: Repository<UserRelation>;

  constructor(dataSource: DataSource) {
    this.userRelationRepository = dataSource.getRepository(UserRelation);
  }

  async getUserRelations(query: QueryGetItems): Promise<UserRelation[]> {
    const userRelations = await this.userRelationRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['relationOwner.profilePicture', 'targetUser.profilePicture'],
    });
    return userRelations;
  }

  async getUserRelationsByUserId(
    userId: string,
    query: QueryGetItems,
  ): Promise<UserRelation[]> {
    const userRelations = await this.userRelationRepository.find({
      // if userIf is exchangeOwner or exchangeTarget
      where: [
        {
          relationOwner: {
            id: userId,
          },
        },
        { targetUser: { id: userId } },
      ],
      take: query.limit || 100,
      skip: query.offset * query.limit || 0,
      relations: ['relationOwner.profilePicture', 'targetUser.profilePicture'],
    });
    return userRelations;
  }

  async getUserRelationById(params: ParamGetItemById): Promise<UserRelation> {
    const userRelation = await this.userRelationRepository.findOne({
      where: { id: params.id },
      relations: ['relationOwner.profilePicture', 'targetUser.profilePicture'],
    });
    return userRelation;
  }

  async getUserRelationByUsersIds(params: {
    currentUserId: string;
    targetUserId: string;
  }): Promise<UserRelation> {
    const userRelation = await this.userRelationRepository.findOne({
      where: [
        {
          relationOwner: {
            id: params.currentUserId,
          },
          targetUser: {
            id: params.targetUserId,
          },
        },
        {
          relationOwner: {
            id: params.targetUserId,
          },
          targetUser: {
            id: params.currentUserId,
          },
        },
      ],
      relations: ['relationOwner.profilePicture', 'targetUser.profilePicture'],
    });
    return userRelation;
  }

  async createUserRelation(
    userRelation: DeepPartial<UserRelation>,
  ): Promise<UserRelation> {
    try {
      const newUserRelation = await this.userRelationRepository.save(
        userRelation,
      );
      return await this.userRelationRepository.findOne({
        where: { id: newUserRelation.id },
        relations: [
          'relationOwner.profilePicture',
          'targetUser.profilePicture',
        ],
      });
    } catch {
      return null;
    }
  }

  async updateUserRelationById(
    id: string,
    userRelation: UserRelation,
  ): Promise<UserRelation> {
    try {
      await this.userRelationRepository.update(id, userRelation);
      return await this.getUserRelationById({ id });
    } catch {
      return null;
    }
  }
}
