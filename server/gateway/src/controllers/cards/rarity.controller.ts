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
  GetCardRaritiesResponseDto,
  GetCardRarityByIdResponseDto,
} from 'src/interfaces/card-service/rarity/rarity.response.dto';
import { ICardRarity } from 'src/interfaces/card-service/rarity/rarity.interface';

@Controller('rarities')
@ApiTags('Rarity')
export class RarityController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardRaritiesResponseDto,
  })
  public async getCardRarities(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardRaritiesResponseDto> {
    const cardRarityResponse: GetResponseArray<ICardRarity> =
      await firstValueFrom(
        this.cardServiceClient.send('get_rarities', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardRarityResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRarityResponse.message,
        cardRarityResponse.status,
      );
    }

    const result: GetCardRaritiesResponseDto = {
      data: cardRarityResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardRarityByIdResponseDto,
  })
  public async getCardRarityById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardRarityByIdResponseDto> {
    const cardRarityResponse: GetResponseOne<ICardRarity> =
      await firstValueFrom(
        this.cardServiceClient.send('get_rarity_by_id', {
          id: params.id,
        }),
      );

    if (cardRarityResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRarityResponse.message,
        cardRarityResponse.status,
      );
    }

    const result: GetCardRarityByIdResponseDto = {
      data: cardRarityResponse.item,
    };

    if (cardRarityResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardRarityResponse.status);
    }

    return result;
  }
}
