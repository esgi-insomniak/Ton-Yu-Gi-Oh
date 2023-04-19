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
import {
  GetCardByIdResponseDto,
  GetCardsResponseDto,
} from '../../interfaces/card-service/card/card.response.dto';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { ICard } from 'src/interfaces/card-service/card/card.interface';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';

@Controller('cards')
@ApiTags('Card')
export class CardController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardsResponseDto,
  })
  public async getCards(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardsResponseDto> {
    const cardResponse: GetResponseArray<ICard> = await firstValueFrom(
      this.cardServiceClient.send('get_cards', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardResponse.message, cardResponse.status);
    }

    const result: GetCardsResponseDto = {
      data: cardResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardByIdResponseDto,
  })
  public async getCardById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardByIdResponseDto> {
    console.log(params);
    const cardResponse: GetResponseOne<ICard> = await firstValueFrom(
      this.cardServiceClient.send('get_card_by_id', {
        id: params.id,
      }),
    );

    if (cardResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardResponse.message, cardResponse.status);
    }

    const result: GetCardByIdResponseDto = {
      data: cardResponse.item,
    };

    if (cardResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardResponse.status);
    }

    return result;
  }
}
