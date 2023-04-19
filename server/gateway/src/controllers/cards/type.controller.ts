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
  GetCardTypeByIdResponseDto,
  GetCardTypesResponseDto,
} from 'src/interfaces/card-service/type/type.response.dto';
import { ICardType } from 'src/interfaces/card-service/type/type.interface';

@Controller('types')
@ApiTags('Type')
export class TypeController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardTypesResponseDto,
  })
  public async getCardTypes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardTypesResponseDto> {
    const cardTypeResponse: GetResponseArray<ICardType> = await firstValueFrom(
      this.cardServiceClient.send('get_types', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardTypeResponse.message,
        cardTypeResponse.status,
      );
    }

    const result: GetCardTypesResponseDto = {
      data: cardTypeResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardTypeByIdResponseDto,
  })
  public async getCardTypeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardTypeByIdResponseDto> {
    const cardTypeResponse: GetResponseOne<ICardType> = await firstValueFrom(
      this.cardServiceClient.send('get_type_by_id', {
        id: params.id,
      }),
    );

    if (cardTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardTypeResponse.message,
        cardTypeResponse.status,
      );
    }

    const result: GetCardTypeByIdResponseDto = {
      data: cardTypeResponse.item,
    };

    if (cardTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardTypeResponse.status);
    }

    return result;
  }
}
