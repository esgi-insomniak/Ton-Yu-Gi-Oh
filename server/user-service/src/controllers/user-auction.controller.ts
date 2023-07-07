import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseOne,
  ParamGetItemById,
} from 'src/interfaces/common/common.response.interface';
import { AuctionService } from 'src/services/user-auction.service';
import { Auction } from 'src/entities/userAuction.entity';
import { DeepPartial } from 'typeorm';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @MessagePattern('create_auction')
  public async createAuction(request: {
    body: DeepPartial<Auction>;
  }): Promise<GetResponseOne<Auction>> {
    const auction = await this.auctionService.createAuction(request.body);
    const result: GetResponseOne<Auction> = {
      status: auction ? HttpStatus.CREATED : HttpStatus.NOT_FOUND,
      message: auction ? null : 'Auction not created',
      item: auction,
    };

    return result;
  }

  @MessagePattern('update_auction_by_id')
  public async updateAuctionById(request: {
    params: ParamGetItemById;
    body: DeepPartial<Auction>;
  }): Promise<GetResponseOne<Auction>> {
    const auction = await this.auctionService.updateAuctionById(
      request.params.id,
      request.body,
    );

    const result: GetResponseOne<Auction> = {
      status: auction ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: auction ? null : 'Auction not updated',
      item: auction,
    };

    return result;
  }

  @MessagePattern('get_actual_auction')
  public async getActualAuction(): Promise<GetResponseOne<Auction>> {
    const actualAuction = await this.auctionService.getActualAuction();

    const result: GetResponseOne<Auction> = {
      status: actualAuction ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: actualAuction ? null : 'Auction not found',
      item: actualAuction,
    };

    return result;
  }
}
