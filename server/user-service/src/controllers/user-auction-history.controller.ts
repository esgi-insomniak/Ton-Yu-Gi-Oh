import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DeepPartial } from 'typeorm';
import { AuctionHistory } from 'src/entities/userAuctionHistory.entity';
import { AuctionHistoryService } from 'src/services/user-auction-history.service';

@Controller('auction_history')
export class AuctionHistoryController {
  constructor(private readonly auctionHistoryService: AuctionHistoryService) {}

  @MessagePattern('create_auction_history')
  public async createAuctionHistory(
    body: DeepPartial<AuctionHistory>,
  ): Promise<GetResponseOne<AuctionHistory>> {
    const auctionHistory =
      await this.auctionHistoryService.createAuctionHistory(body);
    const result: GetResponseOne<AuctionHistory> = {
      status: auctionHistory ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: auctionHistory
        ? 'Auction created succesfully'
        : 'Auction not created',
      item: auctionHistory,
    };

    return result;
  }

  @MessagePattern('get_auction_history_by_auction_id')
  public async getAuctionHistoryByAuctionId(request: {
    params: ParamGetItemById;
    query: QueryGetItems;
  }): Promise<GetResponseArray<AuctionHistory>> {
    const auctionHistories =
      await this.auctionHistoryService.getAuctionHistoryByAuctionId(
        request.params,
        request.query,
      );

    const result: GetResponseArray<AuctionHistory> = {
      status: auctionHistories ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: auctionHistories ? 'Auction found' : 'Auction not found',
      items: auctionHistories,
    };

    return result;
  }

  @MessagePattern('get_auction_history_by_id')
  public async getAuctionHistoryById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<AuctionHistory>> {
    const auctionHistory =
      await this.auctionHistoryService.getAuctionHistoryById(params);

    const result: GetResponseOne<AuctionHistory> = {
      status: auctionHistory ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: auctionHistory ? 'Auction found' : 'Auction not found',
      item: auctionHistory,
    };

    return result;
  }
}
