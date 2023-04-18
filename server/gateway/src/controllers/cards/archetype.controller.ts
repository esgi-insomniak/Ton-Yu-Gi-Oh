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
  GetCardArchetypeByIdResponseDto,
  GetCardArchetypesResponseDto,
} from 'src/interfaces/card-service/archetype/archetype.response.dto';
import { ICardArchetype } from 'src/interfaces/card-service/archetype/archetype.interface';

@Controller('archetypes')
@ApiTags('Archetype')
export class ArchetypeController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardArchetypesResponseDto,
  })
  public async getCardArchetypes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardArchetypesResponseDto> {
    const cardArchetypeResponse: GetResponseArray<ICardArchetype> =
      await firstValueFrom(
        this.cardServiceClient.send('get_archetypes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardArchetypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardArchetypeResponse.message,
        cardArchetypeResponse.status,
      );
    }

    const result: GetCardArchetypesResponseDto = {
      data: cardArchetypeResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardArchetypeByIdResponseDto,
  })
  public async cardArchetypeResponse(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardArchetypeByIdResponseDto> {
    const cardArchetypeResponse: GetResponseOne<ICardArchetype> =
      await firstValueFrom(
        this.cardServiceClient.send('get_archetype_by_id', {
          id: params.id,
        }),
      );

    if (cardArchetypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardArchetypeResponse.message,
        cardArchetypeResponse.status,
      );
    }

    const result: GetCardArchetypeByIdResponseDto = {
      data: cardArchetypeResponse.item,
    };

    if (cardArchetypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardArchetypeResponse.status);
    }

    return result;
  }
}
