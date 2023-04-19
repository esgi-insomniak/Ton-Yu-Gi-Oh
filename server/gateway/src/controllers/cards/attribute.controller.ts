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
  GetCardAttributeByIdResponseDto,
  GetCardAttributesResponseDto,
} from 'src/interfaces/card-service/attribute/attribute.response.dto';
import { ICardAttribute } from 'src/interfaces/card-service/attribute/attribute.interface';

@Controller('attributes')
@ApiTags('Attribute')
export class AttributeController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardAttributesResponseDto,
  })
  public async getCardAttributes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardAttributesResponseDto> {
    const cardAttributeResponse: GetResponseArray<ICardAttribute> =
      await firstValueFrom(
        this.cardServiceClient.send('get_attributes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardAttributeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardAttributeResponse.message,
        cardAttributeResponse.status,
      );
    }

    const result: GetCardAttributesResponseDto = {
      data: cardAttributeResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardAttributeByIdResponseDto,
  })
  public async getCardAttributeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardAttributeByIdResponseDto> {
    const cardAttributeResponse: GetResponseOne<ICardAttribute> =
      await firstValueFrom(
        this.cardServiceClient.send('get_attribute_by_id', {
          id: params.id,
        }),
      );

    if (cardAttributeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardAttributeResponse.message,
        cardAttributeResponse.status,
      );
    }

    const result: GetCardAttributeByIdResponseDto = {
      data: cardAttributeResponse.item,
    };

    if (cardAttributeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardAttributeResponse.status);
    }

    return result;
  }
}
