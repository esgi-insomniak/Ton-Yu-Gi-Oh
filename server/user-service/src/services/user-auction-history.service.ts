import { Injectable } from '@nestjs/common';
import { AuctionHistory } from 'src/entities/userAuctionHistory.entity';
import {
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DataSource, DeepPartial } from 'typeorm';

@Injectable()
export class AuctionHistoryService {
  constructor(private readonly dataSource: DataSource) {}

  async createAuctionHistory(
    auctionHistory: DeepPartial<AuctionHistory>,
  ): Promise<AuctionHistory> {
    const newAuction = await this.dataSource
      .getRepository(AuctionHistory)
      .save(auctionHistory);
    return await this.dataSource.getRepository(AuctionHistory).findOne({
      where: { id: newAuction.id },
      relations: ['auction', 'user'],
    });
  }

  async getAuctionHistoryByAuctionId(
    params: ParamGetItemById,
    query: QueryGetItems,
  ): Promise<AuctionHistory[]> {
    const users = await this.dataSource.getRepository(AuctionHistory).find({
      where: {
        auction: {
          id: params.id,
        },
      },
      take: query.limit || 5,
      skip: query.offset * query.limit || 0,
      order: {
        createdAt: 'DESC',
      },
      relations: ['auction', 'user'],
    });
    return users;
  }

  async getAuctionHistoryById(
    param: ParamGetItemById,
  ): Promise<AuctionHistory> {
    const user = await this.dataSource.getRepository(AuctionHistory).findOne({
      where: { id: param.id },
      relations: ['auction'],
    });
    return user;
  }
}
