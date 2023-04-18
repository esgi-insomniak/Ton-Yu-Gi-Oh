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
import { IUserCardSet } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';
import {
  GetUserCardSetByIdResponseDto,
  GetUserCardSetsResponseDto,
} from 'src/interfaces/user-deck-service/userCardSet/user-card-set.response.dto';

@Controller('user_card_sets')
@ApiTags('UserCardSet')
export class UserCardSetController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetUserCardSetsResponseDto,
  })
  public async getUserCardSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserCardSetsResponseDto> {
    const userCardSetResponse: GetResponseArray<IUserCardSet> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (userCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetResponse.message,
        userCardSetResponse.status,
      );
    }

    const result: GetUserCardSetsResponseDto = {
      data: userCardSetResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetUserCardSetByIdResponseDto,
  })
  public async getUserCardSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserCardSetByIdResponseDto> {
    const userCardSetResponse: GetResponseOne<IUserCardSet> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardset_by_id', {
          id: params.id,
        }),
      );

    if (userCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetResponse.message,
        userCardSetResponse.status,
      );
    }

    const result: GetUserCardSetByIdResponseDto = {
      data: userCardSetResponse.item,
    };

    if (userCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, userCardSetResponse.status);
    }

    return result;
  }
}
