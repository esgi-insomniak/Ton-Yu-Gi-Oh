import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { GetResponseOne } from 'src/interfaces/common/common.response';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuction } from 'src/interfaces/user-service/userAuction/user-auction.interface';
import { GetAuctionByIdResponseDto } from 'src/interfaces/user-service/userAuction/user-auction.response.dto';

@Controller('auction')
@ApiTags('Auction')
export class AuctionController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly auctionService: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetAuctionByIdResponseDto,
  })
  public async getActualAuction(): Promise<GetAuctionByIdResponseDto> {
    const actualAuction: GetResponseOne<IAuction> = await firstValueFrom(
      this.auctionService.send('get_actual_auction', {}),
    );

    if (actualAuction.status !== HttpStatus.OK) {
      throw new HttpException(actualAuction.message, actualAuction.status);
    }

    const result: GetAuctionByIdResponseDto = {
      data: actualAuction.item,
    };

    return result;
  }
}
