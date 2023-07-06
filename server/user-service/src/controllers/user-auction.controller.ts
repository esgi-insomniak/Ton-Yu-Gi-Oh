import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseOne,
} from 'src/interfaces/common/common.response.interface';
import { AuctionService } from 'src/services/user-auction.service';
import { Auction } from 'src/entities/userAuction.entity';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @MessagePattern('create_auction')
  public async createAuction(request: {
    body: Auction;
  }): Promise<GetResponseOne<Auction>> {
    const auction = await this.auctionService.createAuction(
      request.body,
    );
    const result: GetResponseOne<Auction> = {
      status: auction ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: auction ? 'Auction created succesfully' : 'Auction not created',
      item: auction,
    };

    return result;
  }

  @MessagePattern('get_actual_auction')
  public async getActualAuction(): Promise<GetResponseOne<Auction>> {
    const actualAuction = await this.auctionService.getActualAuction();

    const result: GetResponseOne<Auction> = {
        status: actualAuction ? HttpStatus.OK : HttpStatus.NOT_FOUND,
        message: actualAuction ? 'Auction found' : 'Auction not found',
        item: actualAuction,
    };

    return result;
  }
}
