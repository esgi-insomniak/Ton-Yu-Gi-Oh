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
  GetCardSetByIdResponseDto,
  GetCardSetsResponseDto,
} from 'src/interfaces/card-service/set/set.response.dto';
import { ICardSet } from 'src/interfaces/card-service/set/set.interface';

@Controller('sets')
@ApiTags('Set')
export class SetController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardSetsResponseDto,
  })
  public async getCardSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardSetsResponseDto> {
    const cardSetResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    const result: GetCardSetsResponseDto = {
      data: cardSetResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardSetByIdResponseDto,
  })
  public async getCardSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardSetByIdResponseDto> {
    const cardSetResponse: GetResponseOne<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_set_by_id', {
        id: params.id,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    const result: GetCardSetByIdResponseDto = {
      data: cardSetResponse.item,
    };

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardSetResponse.status);
    }

    return result;
  }
}
