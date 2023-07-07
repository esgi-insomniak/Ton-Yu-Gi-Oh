import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { GetResponseArray } from 'src/interfaces/common/common.response';
import { Authorization } from 'src/decorators/authorization.decorator';
import { GetAuctionByIdResponseDto } from 'src/interfaces/user-service/userAuction/user-auction.response.dto';
import { GetAuctionHistoriesResponseDto } from 'src/interfaces/user-service/userAuctionHistory/user-auction-history.response.dto';
import { IAuctionHistory } from 'src/interfaces/user-service/userAuctionHistory/user-auction.interface';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';

@Controller('auction')
@ApiTags('Auction')
export class AuctionHistoryController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly auctionService: ClientProxy,
  ) {}

  @Get(':id/auction_history')
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetAuctionByIdResponseDto,
  })
  public async getAuctionHistoryByAuctionId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetAuctionHistoriesResponseDto> {
    const actualAuctionHistories: GetResponseArray<IAuctionHistory> =
      await firstValueFrom(
        this.auctionService.send('get_auction_history_by_auction_id', {
          params,
          query,
        }),
      );

    if (actualAuctionHistories.status !== HttpStatus.OK) {
      throw new HttpException(
        actualAuctionHistories.message,
        actualAuctionHistories.status,
      );
    }

    const result: GetAuctionHistoriesResponseDto = {
      data: actualAuctionHistories.items,
    };

    return result;
  }
}
