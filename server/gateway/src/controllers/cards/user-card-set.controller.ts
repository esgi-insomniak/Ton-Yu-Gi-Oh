import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { Permission } from 'src/decorators/permission.decorator';
import { ICardSet } from 'src/interfaces/card-service/set/set.interface';
import { GetCardSetsResponseDto } from 'src/interfaces/card-service/set/set.response.dto';

@Controller('user_card_sets')
@ApiTags('UserCardSet')
export class UserCardSetController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  @Authorization(true)
  @Permission(['admin'])
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

@Controller('users')
@ApiTags('UserCardSet')
export class UserController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('CARD_SERVICE')
    private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get(':id/user_card_sets')
  @Authorization(true)
  @ApiOkResponse({
    type: GetCardSetsResponseDto,
  })
  public async getUserCardSetsByUserId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetItemsPaginationDto,
    @Request() request: IAuthorizedRequest,
  ): Promise<GetCardSetsResponseDto> {
    if (params.id !== request.user.id && !request.user.roles.includes('admin'))
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const userCardSetResponse: GetResponseArray<IUserCardSet> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_user_id', {
          params: {
            id: params.id,
          },
          query: {
            limit: query.limit,
            offset: query.offset,
          },
        }),
      );

    if (userCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetResponse.message,
        userCardSetResponse.status,
      );
    }

    const cardSetsResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_cardsets_by_ids', {
        ids: userCardSetResponse.items.map((item) => item.cardSetId),
      }),
    );

    const result: GetCardSetsResponseDto = {
      data: cardSetsResponse.items,
    };

    return result;
  }
}
