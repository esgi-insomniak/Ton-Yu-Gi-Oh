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
  GetCardRaceByIdResponseDto,
  GetCardRacesResponseDto,
} from 'src/interfaces/card-service/race/race.response.dto';
import { ICardRace } from 'src/interfaces/card-service/race/race.interface';

@Controller('races')
@ApiTags('Race')
export class RaceController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardRacesResponseDto,
  })
  public async getCardRaces(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardRacesResponseDto> {
    const cardRaceResponse: GetResponseArray<ICardRace> = await firstValueFrom(
      this.cardServiceClient.send('get_races', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardRaceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRaceResponse.message,
        cardRaceResponse.status,
      );
    }

    const result: GetCardRacesResponseDto = {
      data: cardRaceResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardRaceByIdResponseDto,
  })
  public async getCardRaceById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardRaceByIdResponseDto> {
    const cardRaceResponse: GetResponseOne<ICardRace> = await firstValueFrom(
      this.cardServiceClient.send('get_race_by_id', {
        id: params.id,
      }),
    );

    if (cardRaceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRaceResponse.message,
        cardRaceResponse.status,
      );
    }

    const result: GetCardRaceByIdResponseDto = {
      data: cardRaceResponse.item,
    };

    if (cardRaceResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardRaceResponse.status);
    }

    return result;
  }
}
