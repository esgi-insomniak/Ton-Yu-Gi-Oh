import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { GetResponseOne } from 'src/interfaces/common/common.response';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { CreateAuctionBodyDto } from 'src/interfaces/user-service/userAuction/user-auction.body.dto';
import { IAuction } from 'src/interfaces/user-service/userAuction/user-auction.interface';
import { GetActualAuctionResponseBodyDto, PostAuctionBodyDto } from 'src/interfaces/user-service/userAuction/user-auction.response.dto';

@Controller('auction')
@ApiTags('Auction')
export class AuctionController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly auctionService: ClientProxy,
  ) {}

  @Post()
  @Authorization(true)
  @ApiCreatedResponse({
    type: PostAuctionBodyDto,
  })
  public async createAuction(
    @Body() body: CreateAuctionBodyDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<PostAuctionBodyDto> {
    const createAuction: GetResponseOne<IAuction> = await firstValueFrom(
      this.auctionService.send('create_auction', {
        body,
      }),
    );

    if (createAuction.status !== HttpStatus.CREATED) {
      throw new HttpException(createAuction.message, createAuction.status);
    }

    const result: PostAuctionBodyDto = {
      data: createAuction.item,
    };

    return result;
  }

  @Get()
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetActualAuctionResponseBodyDto,
  })
  public async getActualAuction(): Promise<GetActualAuctionResponseBodyDto> {
    const actualAuction: GetResponseOne<IAuction> = await firstValueFrom(
      this.auctionService.send('get_actual_auction', {}),
    );

    if (actualAuction.status !== HttpStatus.OK) {
      throw new HttpException(actualAuction.message, actualAuction.status);
    }

    const result: GetActualAuctionResponseBodyDto = {
      data: actualAuction.item,
    };

    return result;
  }
}
