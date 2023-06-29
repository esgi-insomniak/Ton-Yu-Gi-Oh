import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { Authorization } from 'src/decorators/authorization.decorator';
import { Permission } from 'src/decorators/permission.decorator';
import { IUserRoles } from 'src/interfaces/user-service/user/user.interface';
import {
  GetUserExchangeByIdResponseDto,
  GetUserExchangesResponseDto,
} from 'src/interfaces/user-service/userExchange/user-exchange.response.dto';
import {
  IUserExchange,
  IUserExchangePartial,
} from 'src/interfaces/user-service/userExchange/user-exchange.interface';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import {
  IUserCardSet,
  IUserCardSetPartial,
} from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';

@Controller('exchanges')
@ApiTags('Exchange')
export class UserExchangeController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Permission([IUserRoles.admin], true)
  @Get()
  @ApiOkResponse({
    type: GetUserExchangesResponseDto,
  })
  public async getUserExchanges(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserExchangesResponseDto> {
    const userExchangesResponse: GetResponseArray<IUserExchangePartial> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_exchanges', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (userExchangesResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userExchangesResponse.message,
        userExchangesResponse.status,
      );
    }

    // store all userCardSets of owner & target
    const allUserCardSetsIds: string[] = userExchangesResponse.items.reduce(
      (acc, userExchange) => {
        acc.push(...userExchange.ownerCardSetsProposed);
        acc.push(...userExchange.targetCardSetsProposed);
        return acc;
      },
      [],
    );

    // get userCardSets
    const userCardSetsResponse: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_ids', {
          ids: allUserCardSetsIds,
        }),
      );

    if (userCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetsResponse.message,
        userCardSetsResponse.status,
      );
    }

    // get cardSets
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userCardSetsResponse.items.map(
            (userCardSet) => userCardSet.cardSetId,
          ),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    const result: GetUserExchangesResponseDto = {
      data: userExchangesResponse.items.map((userExchangePartial) => {
        const userExchange: IUserExchange = {
          ...userExchangePartial,
          ownerCardSetsProposed: userExchangePartial.ownerCardSetsProposed.map(
            (userCardSetId: string) => {
              const userCardSet: IUserCardSet = {
                id: userCardSetId,
                userId: userExchangePartial.exchangeOwner.id,
                cardSet: cardSetsResponse.items.find(
                  (cardSet) =>
                    cardSet.id ===
                    userCardSetsResponse.items.find(
                      (userCardSet) => userCardSet.id === userCardSetId,
                    ).cardSetId,
                ),
              };
              return userCardSet;
            },
          ),
          targetCardSetsProposed:
            userExchangePartial.targetCardSetsProposed.map(
              (userCardSetId: string) => {
                const userCardSet: IUserCardSet = {
                  id: userCardSetId,
                  userId: userExchangePartial.exchangeTarget.id,
                  cardSet: cardSetsResponse.items.find(
                    (cardSet) =>
                      cardSet.id ===
                      userCardSetsResponse.items.find(
                        (userCardSet) => userCardSet.id === userCardSetId,
                      ).cardSetId,
                  ),
                };
                return userCardSet;
              },
            ),
        };
        return userExchange;
      }),
    };

    return result;
  }

  @Authorization(true)
  @Get(':id')
  @ApiOkResponse({
    type: GetUserExchangeByIdResponseDto,
  })
  public async getUserExchangeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserExchangeByIdResponseDto> {
    const userExchangeResponse: GetResponseOne<IUserExchangePartial> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_exchange_by_id', {
          id: params.id,
        }),
      );

    if (userExchangeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userExchangeResponse.message,
        userExchangeResponse.status,
      );
    }

    // store all userCardSets of owner & target
    const allUserCardSetsIds: string[] = [
      ...userExchangeResponse.item.ownerCardSetsProposed,
      ...userExchangeResponse.item.targetCardSetsProposed,
    ];

    // get userCardSets
    const userCardSetsResponse: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_ids', {
          ids: allUserCardSetsIds,
        }),
      );

    if (userCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetsResponse.message,
        userCardSetsResponse.status,
      );
    }

    // get cardSets
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userCardSetsResponse.items.map(
            (userCardSet) => userCardSet.cardSetId,
          ),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    const result: GetUserExchangeByIdResponseDto = {
      data: {
        ...userExchangeResponse.item,
        ownerCardSetsProposed:
          userExchangeResponse.item.ownerCardSetsProposed.map(
            (userCardSetId: string) => {
              const userCardSet: IUserCardSet = {
                id: userCardSetId,
                userId: userExchangeResponse.item.exchangeOwner.id,
                cardSet: cardSetsResponse.items.find(
                  (cardSet) =>
                    cardSet.id ===
                    userCardSetsResponse.items.find(
                      (userCardSet) => userCardSet.id === userCardSetId,
                    ).cardSetId,
                ),
              };
              return userCardSet;
            },
          ),
        targetCardSetsProposed:
          userExchangeResponse.item.targetCardSetsProposed.map(
            (userCardSetId: string) => {
              const userCardSet: IUserCardSet = {
                id: userCardSetId,
                userId: userExchangeResponse.item.exchangeTarget.id,
                cardSet: cardSetsResponse.items.find(
                  (cardSet) =>
                    cardSet.id ===
                    userCardSetsResponse.items.find(
                      (userCardSet) => userCardSet.id === userCardSetId,
                    ).cardSetId,
                ),
              };
              return userCardSet;
            },
          ),
      },
    };

    return result;
  }
}

@Controller('users')
@ApiTags('Exchange')
export class UserExchangeUserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Get(':id/exchanges')
  @ApiOkResponse({
    type: GetUserExchangesResponseDto,
  })
  public async getUserExchangeByUserId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetItemsPaginationDto,
    @Req() req: IAuthorizedRequest,
  ): Promise<GetUserExchangesResponseDto> {
    if (req.user.id !== params.id && !req.user.roles.includes('admin')) {
      throw new HttpException(
        'You are not allowed to access this resource',
        HttpStatus.FORBIDDEN,
      );
    }

    const userExchangesResponse: GetResponseArray<IUserExchangePartial> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_exchanges_by_user_id', {
          params: { userId: params.id },
          query,
        }),
      );

    if (userExchangesResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userExchangesResponse.message,
        userExchangesResponse.status,
      );
    }

    // store all userCardSets of owner & target
    const allUserCardSetsIds: string[] = userExchangesResponse.items.reduce(
      (acc, userExchange) => {
        acc.push(...userExchange.ownerCardSetsProposed);
        acc.push(...userExchange.targetCardSetsProposed);
        return acc;
      },
      [],
    );

    // get userCardSets
    const userCardSetsResponse: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_ids', {
          ids: allUserCardSetsIds,
        }),
      );

    if (userCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetsResponse.message,
        userCardSetsResponse.status,
      );
    }

    // get cardSets
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userCardSetsResponse.items.map(
            (userCardSet) => userCardSet.cardSetId,
          ),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    const result: GetUserExchangesResponseDto = {
      data: userExchangesResponse.items.map((userExchangePartial) => {
        const userExchange: IUserExchange = {
          ...userExchangePartial,
          ownerCardSetsProposed: userExchangePartial.ownerCardSetsProposed.map(
            (userCardSetId: string) => {
              const userCardSet: IUserCardSet = {
                id: userCardSetId,
                userId: userExchangePartial.exchangeOwner.id,
                cardSet: cardSetsResponse.items.find(
                  (cardSet) =>
                    cardSet.id ===
                    userCardSetsResponse.items.find(
                      (userCardSet) => userCardSet.id === userCardSetId,
                    ).cardSetId,
                ),
              };
              return userCardSet;
            },
          ),
          targetCardSetsProposed:
            userExchangePartial.targetCardSetsProposed.map(
              (userCardSetId: string) => {
                const userCardSet: IUserCardSet = {
                  id: userCardSetId,
                  userId: userExchangePartial.exchangeTarget.id,
                  cardSet: cardSetsResponse.items.find(
                    (cardSet) =>
                      cardSet.id ===
                      userCardSetsResponse.items.find(
                        (userCardSet) => userCardSet.id === userCardSetId,
                      ).cardSetId,
                  ),
                };
                return userCardSet;
              },
            ),
        };
        return userExchange;
      }),
    };

    return result;
  }
}
