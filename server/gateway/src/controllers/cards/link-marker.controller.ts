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
  GetCardLinkMarkerByIdResponseDto,
  GetCardLinkMarkersResponseDto,
} from 'src/interfaces/card-service/linkMarker/link-marker.response.dto';
import { ICardLinkMarker } from 'src/interfaces/card-service/linkMarker/link-marker.interface';

@Controller('link_markers')
@ApiTags('LinkMarker')
export class LinkMarkerController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardLinkMarkersResponseDto,
  })
  public async getCardLinkMarkers(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardLinkMarkersResponseDto> {
    const cardLinkMarkerResponse: GetResponseArray<ICardLinkMarker> =
      await firstValueFrom(
        this.cardServiceClient.send('get_linkmarkers', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardLinkMarkerResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardLinkMarkerResponse.message,
        cardLinkMarkerResponse.status,
      );
    }

    const result: GetCardLinkMarkersResponseDto = {
      data: cardLinkMarkerResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardLinkMarkerByIdResponseDto,
  })
  public async getCardLinkMarkerById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardLinkMarkerByIdResponseDto> {
    const cardLinkMarkerResponse: GetResponseOne<ICardLinkMarker> =
      await firstValueFrom(
        this.cardServiceClient.send('get_linkmarker_by_id', {
          id: params.id,
        }),
      );

    if (cardLinkMarkerResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardLinkMarkerResponse.message,
        cardLinkMarkerResponse.status,
      );
    }

    const result: GetCardLinkMarkerByIdResponseDto = {
      data: cardLinkMarkerResponse.item,
    };

    if (cardLinkMarkerResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardLinkMarkerResponse.status);
    }

    return result;
  }
}
