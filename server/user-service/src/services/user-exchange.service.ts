import { Injectable } from '@nestjs/common';
import { UserExchange } from 'src/entities/userExchange.entity';
import {
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserExchangeService {
  private userExchangeRepository: Repository<UserExchange>;

  constructor(dataSource: DataSource) {
    this.userExchangeRepository = dataSource.getRepository(UserExchange);
  }

  async getUserExchanges(query: QueryGetItems): Promise<UserExchange[]> {
    const userExchanges = await this.userExchangeRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: [
        'exchangeOwner.profilePicture',
        'exchangeTarget.profilePicture',
      ],
    });
    return userExchanges;
  }

  async getUserExchangesByUserId(
    userId: string,
    query: QueryGetItems,
  ): Promise<UserExchange[]> {
    const userExchanges = await this.userExchangeRepository.find({
      // if userIf is exchangeOwner or exchangeTarget
      where: [
        {
          exchangeOwner: {
            id: userId,
          },
        },
        { exchangeTarget: { id: userId } },
      ],
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: [
        'exchangeOwner.profilePicture',
        'exchangeTarget.profilePicture',
      ],
    });
    return userExchanges;
  }

  async getUserExchangeById(params: ParamGetItemById): Promise<UserExchange> {
    const userExchange = await this.userExchangeRepository.findOne({
      where: { id: params.id },
      relations: [
        'exchangeOwner.profilePicture',
        'exchangeTarget.profilePicture',
      ],
    });
    return userExchange;
  }

  async createUserExchange(
    userExchangePartial: DeepPartial<UserExchange>,
  ): Promise<UserExchange> {
    try {
      const userExchange = await this.userExchangeRepository.create(
        userExchangePartial,
      );

      return await this.userExchangeRepository.findOne({
        where: { id: userExchange.id },
        relations: [
          'exchangeOwner.profilePicture',
          'exchangeTarget.profilePicture',
        ],
      });
    } catch {
      return null;
    }
  }

  async updateUserExchangeById(
    id: string,
    userExchange: UserExchange,
  ): Promise<UserExchange> {
    try {
      await this.userExchangeRepository.update(id, userExchange);
      return await this.getUserExchangeById({ id });
    } catch {
      return null;
    }
  }
}
