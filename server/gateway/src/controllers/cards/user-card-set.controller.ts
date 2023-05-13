import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetItemsPaginationDto } from '../../interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from '../../interfaces/common/common.response';
import { GetItemByIdDto } from '../../interfaces/common/common.params.dto';
import {
  IUserCardSet,
  IUserCardSetPartial,
} from '../../interfaces/user-deck-service/userCardSet/user-card-set.interface';
import {
  GetUserCardSetByIdResponseDto,
  GetUserCardSetsResponseDto,
} from '../../interfaces/user-deck-service/userCardSet/user-card-set.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { Permission } from 'src/decorators/permission.decorator';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';
import { GetUserCardSetsQuery } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.query.dto';

@Controller('user_card_sets')
@ApiTags('UserCardSet')
export class UserCardSetController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
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
    // get userCardSet by id
    const userCardSetResponse: GetResponseOne<IUserCardSetPartial> =
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

    // get cardSet by id
    const cardSetResponse: GetResponseOne<ICardCardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_cardset_by_id', {
        id: userCardSetResponse.item.cardSetId,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    // create response with combined data of cardSet and userCardSet
    const result: GetUserCardSetByIdResponseDto = {
      data: {
        id: userCardSetResponse.item.id,
        userId: userCardSetResponse.item.userId,
        cardSet: cardSetResponse.item,
      },
    };

    if (userCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, userCardSetResponse.status);
    }

    return result;
  }

  // TODO: Add type of response
  @Delete(':id/scrap')
  @Authorization(true)
  @ApiOkResponse()
  @ApiOperation({
    summary: 'NOT IMPLEMENTED YET',
  })
  public async scrapCardSetById(
    @Param() params: GetItemByIdDto,
    @Request() request: IAuthorizedRequest,
  ): Promise<any> {
    return;
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
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get(':id/user_card_sets')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserCardSetsResponseDto,
  })
  public async getUserCardSetsByUserId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetUserCardSetsQuery,
  ): Promise<GetUserCardSetsResponseDto> {
    const userResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    // get userCardSets
    const userCardSetResponse: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_user_id', {
          params: {
            id: params.id,
          },
        }),
      );

    if (userCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetResponse.message,
        userCardSetResponse.status,
      );
    }

    // get all unique cardSetIds
    const cardSetIds = userCardSetResponse.items
      .map((item) => item.cardSetId)
      .filter((value, index, self) => self.indexOf(value) === index);

    // get cardSets
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: cardSetIds,
          query,
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    // create response with combined data of cardSets and userCardSets
    const result: GetUserCardSetsResponseDto = {
      data: userCardSetResponse.items.map((partialCardSet) => {
        const userCardSet: IUserCardSet = {
          id: partialCardSet.id,
          userId: partialCardSet.userId,
          cardSet: cardSetsResponse.items.find(
            (item) => item.id === partialCardSet.cardSetId,
          ),
        };
        return userCardSet;
      }),
    };

    return result;
  }
}
