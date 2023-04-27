import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
  Post,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetCardSetByIdResponseDto,
  GetCardSetsResponseDto,
} from 'src/interfaces/card-service/set/set.response.dto';
import { ICardSet } from 'src/interfaces/card-service/set/set.interface';
import { BuySetBodyDto } from 'src/interfaces/card-service/set/set.body.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { GetUserSetsResponseDto } from 'src/interfaces/user-deck-service/userSet/user-set.response.dto';
import {
  IUserSet,
  IUserSetPartial,
} from 'src/interfaces/user-deck-service/userSet/user-set.interface';
import { IUser } from 'src/interfaces/user-service/user/user.interface';

@Controller('sets')
@ApiTags('Set')
export class SetController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetCardSetsResponseDto,
  })
  public async getCardSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardSetsResponseDto> {
    const cardSetResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    const result: GetCardSetsResponseDto = {
      data: cardSetResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardSetByIdResponseDto,
  })
  public async getCardSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardSetByIdResponseDto> {
    const cardSetResponse: GetResponseOne<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_set_by_id', {
        id: params.id,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    const result: GetCardSetByIdResponseDto = {
      data: cardSetResponse.item,
    };

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardSetResponse.status);
    }

    return result;
  }

  @Post(':id/buy')
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetUserSetsResponseDto,
  })
  public async buySets(
    @Param() params: GetItemByIdDto,
    @Body() body: BuySetBodyDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<GetUserSetsResponseDto> {
    // TODO: add price for each set
    const setPrice = 100;
    const coinsToPay = setPrice * body.amount;

    // check if set exists
    const cardSetResponse: GetResponseOne<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_set_by_id', {
        id: params.id,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    if (request.user.coins - coinsToPay < 0) {
      throw new HttpException(
        `Not enough coins. ${coinsToPay - request.user.coins} coins missing`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // create user sets
    const userSetsResponse: GetResponseArray<IUserSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('create_usersets', {
          userId: request.user.id,
          setId: params.id,
          amount: body.amount,
        }),
      );

    if (userSetsResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        userSetsResponse.message,
        userSetsResponse.status,
      );
    }

    // update user coins
    const userCoinsResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('remove_coins_user', {
        userId: request.user.id,
        coins: coinsToPay,
      }),
    );

    if (userCoinsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCoinsResponse.message,
        userCoinsResponse.status,
      );
    }

    // create response with combined data of sets and userSets
    const result: GetUserSetsResponseDto = {
      data: userSetsResponse.items.map((partialUserSet) => {
        const set: IUserSet = {
          id: partialUserSet.id,
          userId: partialUserSet.userId,
          set: cardSetResponse.item,
        };
        return set;
      }),
    };

    return result;
  }
}
