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
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetCardPriceByIdResponseDto,
  GetCardPricesResponseDto,
} from 'src/interfaces/card-service/price/price.response.dto';
import { ICardPrice } from 'src/interfaces/card-service/price/price.interface';

@Controller('card_prices')
@ApiTags('CardPrice')
export class CardPriceController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardPricesResponseDto,
  })
  public async getCardPrices(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardPricesResponseDto> {
    const cardPriceResponse: GetResponseArray<ICardPrice> =
      await firstValueFrom(
        this.cardServiceClient.send('get_prices', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardPriceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardPriceResponse.message,
        cardPriceResponse.status,
      );
    }

    const result: GetCardPricesResponseDto = {
      data: cardPriceResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardPriceByIdResponseDto,
  })
  public async getCardPriceById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardPriceByIdResponseDto> {
    const cardPriceResponse: GetResponseOne<ICardPrice> = await firstValueFrom(
      this.cardServiceClient.send('get_price_by_id', {
        id: params.id,
      }),
    );

    if (cardPriceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardPriceResponse.message,
        cardPriceResponse.status,
      );
    }

    const result: GetCardPriceByIdResponseDto = {
      data: cardPriceResponse.item,
    };

    if (cardPriceResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardPriceResponse.status);
    }

    return result;
  }
}
