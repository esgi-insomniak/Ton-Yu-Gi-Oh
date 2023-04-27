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
  GetCardCardSetByIdResponseDto,
  GetCardCardSetsResponseDto,
} from 'src/interfaces/card-service/cardSet/card-set.response.dto';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';

@Controller('card_sets')
@ApiTags('CardSet')
export class CardSetController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardCardSetsResponseDto,
  })
  public async getCardCardSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardCardSetsResponseDto> {
    const cardCardSetResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardCardSetResponse.message,
        cardCardSetResponse.status,
      );
    }

    const result: GetCardCardSetsResponseDto = {
      data: cardCardSetResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardCardSetByIdResponseDto,
  })
  public async getCardCardSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardCardSetByIdResponseDto> {
    const cardCardSetResponse: GetResponseOne<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardset_by_id', {
          id: params.id,
        }),
      );

    if (cardCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardCardSetResponse.message,
        cardCardSetResponse.status,
      );
    }

    const result: GetCardCardSetByIdResponseDto = {
      data: cardCardSetResponse.item,
    };

    if (cardCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardCardSetResponse.status);
    }

    return result;
  }
}
