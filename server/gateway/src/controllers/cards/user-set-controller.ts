import {
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
  GetUserSetByIdResponseDto,
  GetUserSetsResponseDto,
} from 'src/interfaces/user-deck-service/userSet/user-set.response.dto';
import {
  IUserSet,
  IUserSetPartial,
} from 'src/interfaces/user-deck-service/userSet/user-set.interface';
import { GetUserCardSetsResponseDto } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { ICardSet } from 'src/interfaces/card-service/set/set.interface';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { ICardRarityDropTable } from 'src/interfaces/card-service/rarityDropTable/rarity-drop-table.interface';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';
import {
  IUserCardSet,
  IUserCardSetPartial,
} from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';

@Controller('user_sets')
@ApiTags('UserSet')
export class UserSetController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('CARD_SERVICE')
    private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserSetByIdResponseDto,
  })
  public async getUserSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserSetByIdResponseDto> {
    // get userSet by id
    const userSetResponse: GetResponseOne<IUserSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_userset_by_id', {
          id: params.id,
        }),
      );

    if (userSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(userSetResponse.message, userSetResponse.status);
    }

    // get set by id
    const setResponse: GetResponseOne<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_set_by_id', {
        id: userSetResponse.item.setId,
      }),
    );

    if (setResponse.status !== HttpStatus.OK) {
      throw new HttpException(setResponse.message, setResponse.status);
    }

    const result: GetUserSetByIdResponseDto = {
      data: {
        id: userSetResponse.item.id,
        userId: userSetResponse.item.userId,
        set: setResponse.item,
      },
    };

    if (userSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, userSetResponse.status);
    }

    return result;
  }

  @Post(':id/open')
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetUserCardSetsResponseDto,
  })
  public async openUserSet(
    @Param() params: GetItemByIdDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<GetUserCardSetsResponseDto> {
    // get userSet by id
    const userSetResponse: GetResponseOne<IUserSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_userset_by_id', {
          id: params.id,
        }),
      );

    if (userSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(userSetResponse.message, userSetResponse.status);
    }

    // check if user is owner of the set
    if (userSetResponse.item.userId !== request.user.id) {
      throw new HttpException(
        'You are not allowed to open this set',
        HttpStatus.BAD_REQUEST,
      );
    }

    // get set by id
    const setResponse: GetResponseOne<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_set_by_id', {
        id: userSetResponse.item.setId,
        relations: ['cardSets.rarity.dropTable'],
      }),
    );

    if (setResponse.status !== HttpStatus.OK) {
      throw new HttpException(setResponse.message, setResponse.status);
    }

    // get all the different rarities in the set
    const raritiesInSet: ICardRarityDropTable[] = setResponse.item.cardSets
      .reduce((acc, cardSet) => {
        if (!acc.find((item) => item.id === cardSet.rarity.dropTable.id)) {
          acc.push(cardSet.rarity.dropTable);
        }
        return acc;
      }, [])
      .sort((a, b) => a.priority - b.priority);

    const commonRaritySlots = raritiesInSet[0];
    const higherRaritySlots = raritiesInSet.slice(1);
    const cardSetsTmpCommonOnHigherRarity: ICardCardSet[] = [];
    const cardSetsEarned: ICardCardSet[] = [];

    for (let i = 0; i < setResponse.item.cardSetsOnOpen; i++) {
      // 100% change to get common rarity on common reserved slots
      if (i < setResponse.item.cardSetsOnOpen - higherRaritySlots.length) {
        const filteredEarnableCommonCardSets = setResponse.item.cardSets.filter(
          (cardSet) =>
            cardSet.rarity.dropTable.id === commonRaritySlots.id &&
            !cardSetsEarned.find((item) => item.id === cardSet.id),
        );

        cardSetsEarned.push(
          filteredEarnableCommonCardSets[
            Math.floor(Math.random() * filteredEarnableCommonCardSets.length)
          ],
        );

        continue;
      }

      // 100% chance to get a higher rarity on first slot
      if (i === setResponse.item.cardSetsOnOpen - higherRaritySlots.length) {
        const filteredEarnableHigherRarityCardSets =
          setResponse.item.cardSets.filter(
            (cardSet) =>
              cardSet.rarity.dropTable.id === higherRaritySlots[0].id &&
              !cardSetsEarned.find((item) => item.id === cardSet.id),
          );

        cardSetsEarned.push(
          filteredEarnableHigherRarityCardSets[
            Math.floor(
              Math.random() * filteredEarnableHigherRarityCardSets.length,
            )
          ],
        );

        continue;
      }

      // for other slots, % chance to get a higher rarity or a common
      // dropRate is a % chance
      if (
        Math.random() <
        higherRaritySlots[
          i - (setResponse.item.cardSetsOnOpen - higherRaritySlots.length)
        ].dropRate /
          100
      ) {
        const filteredEarnableHigherRarityCardSets =
          setResponse.item.cardSets.filter(
            (cardSet) =>
              cardSet.rarity.dropTable.id ===
                higherRaritySlots[
                  i -
                    (setResponse.item.cardSetsOnOpen - higherRaritySlots.length)
                ].id && !cardSetsEarned.find((item) => item.id === cardSet.id),
          );

        cardSetsEarned.push(
          filteredEarnableHigherRarityCardSets[
            Math.floor(
              Math.random() * filteredEarnableHigherRarityCardSets.length,
            )
          ],
        );

        continue;
      }

      const filteredEarnableCommonCardSets = setResponse.item.cardSets.filter(
        (cardSet) =>
          cardSet.rarity.dropTable.id === commonRaritySlots.id &&
          !cardSetsEarned.find((item) => item.id === cardSet.id) &&
          !cardSetsTmpCommonOnHigherRarity.find(
            (item) => item.id === cardSet.id,
          ),
      );

      cardSetsTmpCommonOnHigherRarity.push(
        filteredEarnableCommonCardSets[
          Math.floor(Math.random() * filteredEarnableCommonCardSets.length)
        ],
      );
    }

    cardSetsEarned.push(...cardSetsTmpCommonOnHigherRarity);

    // delete the userSet
    this.userDeckServiceClient.emit('delete_userset_by_id', {
      id: userSetResponse.item.id,
    });

    // create a new userCardSets from the cardSetsEarned
    const earnedUserCardSetsPartial: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('post_usercardsets_by_cardset_ids', {
          userId: request.user.id,
          cardSetIds: cardSetsEarned.map((cardSet) => cardSet.id),
        }),
      );

    // get cardSets
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: earnedUserCardSetsPartial.items.map((item) => item.cardSetId),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    const earnedUserCardSets: IUserCardSet[] =
      earnedUserCardSetsPartial.items.map((item) => ({
        id: item.id,
        userId: item.userId,
        cardSet: cardSetsResponse.items.find(
          (cardSet) => cardSet.id === item.cardSetId,
        ),
      }));

    const result: GetUserCardSetsResponseDto = {
      data: earnedUserCardSets,
    };

    return result;
  }
}

@Controller('users')
@ApiTags('UserSet')
export class UserSetUserController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
    @Inject('CARD_SERVICE')
    private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get(':id/user_sets')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserSetsResponseDto,
  })
  public async getUserDecksByUserId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserSetsResponseDto> {
    const userResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    // get userSets by userId
    const userSetsResponse: GetResponseArray<IUserSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usersets_by_user_id', {
          params,
          query,
        }),
      );

    if (userSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userSetsResponse.message,
        userSetsResponse.status,
      );
    }

    // get sets
    const setsResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets_by_ids', {
        ids: userSetsResponse.items.map((item) => item.setId),
      }),
    );

    if (setsResponse.status !== HttpStatus.OK) {
      throw new HttpException(setsResponse.message, setsResponse.status);
    }

    // create response with combined data of sets and userSets
    const result: GetUserSetsResponseDto = {
      data: userSetsResponse.items.map((partialuserSet) => {
        const userSet: IUserSet = {
          id: partialuserSet.id,
          userId: partialuserSet.userId,
          set: setsResponse.items.find(
            (set) => set.id === partialuserSet.setId,
          ),
        };
        return userSet;
      }),
    };

    return result;
  }
}
