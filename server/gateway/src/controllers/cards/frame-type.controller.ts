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
  GetCardFrameTypeByIdResponseDto,
  GetCardFrameTypesResponseDto,
} from 'src/interfaces/card-service/frameType/frame-type.response.dto';
import { ICardFrameType } from 'src/interfaces/card-service/frameType/frame-type.interface';

@Controller('frame_types')
@ApiTags('FrameType')
export class FrameTypeController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardFrameTypesResponseDto,
  })
  public async getCardFrameTypes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardFrameTypesResponseDto> {
    const cardFrameTypeResponse: GetResponseArray<ICardFrameType> =
      await firstValueFrom(
        this.cardServiceClient.send('get_frametypes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardFrameTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardFrameTypeResponse.message,
        cardFrameTypeResponse.status,
      );
    }

    const result: GetCardFrameTypesResponseDto = {
      data: cardFrameTypeResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardFrameTypeByIdResponseDto,
  })
  public async getCardFrameTypeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardFrameTypeByIdResponseDto> {
    const cardFrameTypeResponse: GetResponseOne<ICardFrameType> =
      await firstValueFrom(
        this.cardServiceClient.send('get_frametype_by_id', {
          id: params.id,
        }),
      );

    if (cardFrameTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardFrameTypeResponse.message,
        cardFrameTypeResponse.status,
      );
    }

    const result: GetCardFrameTypeByIdResponseDto = {
      data: cardFrameTypeResponse.item,
    };

    if (cardFrameTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardFrameTypeResponse.status);
    }

    return result;
  }
}
