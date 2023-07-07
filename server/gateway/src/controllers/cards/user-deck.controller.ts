import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  IUserDeck,
  IUserDeckPartial,
} from 'src/interfaces/user-deck-service/userDeck/user-deck.interface';
import {
  GetUserDeckByIdResponseDto,
  GetUserDecksResponseDto,
} from 'src/interfaces/user-deck-service/userDeck/user-deck.response.dto';
import {
  CreateUserDeckBodyDto,
  UpdateUserDeckBodyDto,
} from 'src/interfaces/user-deck-service/userDeck/user-deck.body.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';
import {
  IUserCardSet,
  IUserCardSetPartial,
} from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';
import { MeToId } from 'src/decorators/me-to-id.decorator';

@Controller('user_decks')
@ApiTags('UserDeck')
export class UserDeckController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('CARD_SERVICE')
    private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserDeckByIdResponseDto,
  })
  public async getUserDeckById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserDeckByIdResponseDto> {
    // get userDeck by id
    const userDeckResponse: GetResponseOne<IUserDeckPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_userdeck_by_id', {
          id: params.id,
        }),
      );

    if (userDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userDeckResponse.message,
        userDeckResponse.status,
      );
    }

    // get cardSets by cardSetIds
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userDeckResponse.item.cardSets.map((item) => item.cardSetId),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    // create response with combined data of userDecks and cardSets
    const result: GetUserDeckByIdResponseDto = {
      data: {
        id: userDeckResponse.item.id,
        userId: userDeckResponse.item.userId,
        name: userDeckResponse.item.name,
        cardSets: userDeckResponse.item.cardSets.map((partialCardSet) => {
          const cardSet: IUserCardSet = {
            id: partialCardSet.id,
            userId: partialCardSet.userId,
            cardSet: cardSetsResponse.items.find(
              (item) => item.id === partialCardSet.cardSetId,
            ),
          };
          return cardSet;
        }),
      },
    };

    return result;
  }

  @Post()
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetUserDeckByIdResponseDto,
  })
  public async createUserDeck(
    @Body() body: CreateUserDeckBodyDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<GetUserDeckByIdResponseDto> {
    const userCardSetsResponse: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_ids', {
          ids: body.userCardSetIds,
        }),
      );

    if (userCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetsResponse.message,
        userCardSetsResponse.status,
      );
    }

    if (userCardSetsResponse.items.length !== body.userCardSetIds.length) {
      throw new HttpException(
        'Some of userCardSetIds are not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check all userCardSets belongs to the same user
    userCardSetsResponse.items.forEach((item) => {
      if (item.userId !== request.user.id) {
        throw new HttpException(
          'You can not create userDeck with userCardSets that do not belong to you',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    // check if userCardSets are banned or if same cardSets are used more than 3 times
    const checkBannedCardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userCardSetsResponse.items.map((item) => item.cardSetId),
        }),
      );

    if (checkBannedCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        checkBannedCardSetsResponse.message,
        checkBannedCardSetsResponse.status,
      );
    }

    checkBannedCardSetsResponse.items.reduce((acc, item) => {
      if (item.card.atk === null && item.card.def === null) {
        throw new HttpException(
          'You can not create userDeck with banned cardSets',
          HttpStatus.BAD_REQUEST,
        );
      } else if (acc[item.id]) {
        acc[item.id] += 1;
        if (acc[item.id] > 3) {
          throw new HttpException(
            'You can not create userDeck with more than 3 same cardSets',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        acc[item.id] = 1;
      }
      return acc;
    }, {});

    // create userDeck
    const userDeckResponse: GetResponseOne<IUserDeckPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('post_userdeck', {
          userId: request.user.id,
          name: body.name,
          userCardSetsIds: body.userCardSetIds,
        }),
      );

    if (userDeckResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        userDeckResponse.message,
        userDeckResponse.status,
      );
    }

    // get cardSets by cardSetIds
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userDeckResponse.item.cardSets.map((item) => item.cardSetId),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    // create response with combined data of userDecks and cardSets
    const result: GetUserDeckByIdResponseDto = {
      data: {
        id: userDeckResponse.item.id,
        userId: userDeckResponse.item.userId,
        name: userDeckResponse.item.name,
        cardSets: userDeckResponse.item.cardSets.map((partialCardSet) => {
          const cardSet: IUserCardSet = {
            id: partialCardSet.id,
            userId: partialCardSet.userId,
            cardSet: cardSetsResponse.items.find(
              (item) => item.id === partialCardSet.cardSetId,
            ),
          };
          return cardSet;
        }),
      },
    };

    return result;
  }

  @Patch(':id')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserDeckByIdResponseDto,
  })
  @ApiOperation({
    summary: 'NOT IMPLEMENTED YET',
  })
  public async updateUserDeckById(
    @Param() params: GetItemByIdDto,
    @Body() body: UpdateUserDeckBodyDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<GetUserDeckByIdResponseDto> {
    const userDeckResponse: GetResponseOne<IUserDeckPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_userdeck_by_id', {
          id: params.id,
        }),
      );

    if (userDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userDeckResponse.message,
        userDeckResponse.status,
      );
    }

    if (
      userDeckResponse.item.userId !== request.user.id &&
      !request.user.roles.includes('admin')
    ) {
      throw new HttpException(
        'You can not update userDeck that do not belong to you',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCardSetsResponse: GetResponseArray<IUserCardSetPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_usercardsets_by_ids', {
          ids: body.userCardSetIds,
        }),
      );

    if (userCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userCardSetsResponse.message,
        userCardSetsResponse.status,
      );
    }

    if (userCardSetsResponse.items.length !== body.userCardSetIds.length) {
      throw new HttpException(
        'Some of userCardSetIds are not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check all userCardSets belongs to the same user
    userCardSetsResponse.items.forEach((item) => {
      if (item.userId !== request.user.id) {
        throw new HttpException(
          'You can not update userDeck with userCardSets that do not belong to you',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    // check if userCardSets are banned or if same cardSets are used more than 3 times
    const checkBannedCardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: userCardSetsResponse.items.map((item) => item.cardSetId),
        }),
      );

    if (checkBannedCardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        checkBannedCardSetsResponse.message,
        checkBannedCardSetsResponse.status,
      );
    }

    checkBannedCardSetsResponse.items.reduce((acc, item) => {
      if (item.card.atk === null && item.card.def === null) {
        throw new HttpException(
          'You can not create userDeck with banned cardSets',
          HttpStatus.BAD_REQUEST,
        );
      } else if (acc[item.id]) {
        acc[item.id] += 1;
        if (acc[item.id] > 3) {
          throw new HttpException(
            'You can not create userDeck with more than 3 same cardSets',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        acc[item.id] = 1;
      }
      return acc;
    }, {});

    // update userDeck
    const updatedUserDeckResponse: GetResponseOne<IUserDeckPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('update_userdeck_by_id', {
          params: {
            id: params.id,
          },
          body,
        }),
      );

    if (updatedUserDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        updatedUserDeckResponse.message,
        updatedUserDeckResponse.status,
      );
    }

    // get cardSets by cardSetIds
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: updatedUserDeckResponse.item.cardSets.map(
            (item) => item.cardSetId,
          ),
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    // create response with combined data of userDecks and cardSets
    const result: GetUserDeckByIdResponseDto = {
      data: {
        id: updatedUserDeckResponse.item.id,
        userId: updatedUserDeckResponse.item.userId,
        name: updatedUserDeckResponse.item.name,
        cardSets: updatedUserDeckResponse.item.cardSets.map(
          (partialCardSet) => {
            const cardSet: IUserCardSet = {
              id: partialCardSet.id,
              userId: partialCardSet.userId,
              cardSet: cardSetsResponse.items.find(
                (item) => item.id === partialCardSet.cardSetId,
              ),
            };
            return cardSet;
          },
        ),
      },
    };

    return result;
  }

  @Delete(':id')
  @Authorization(true)
  @ApiOkResponse()
  public async deleteUserDeckById(
    @Param() params: GetItemByIdDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<void> {
    const userDeckResponse: GetResponseOne<IUserDeckPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_userdeck_by_id', {
          id: params.id,
        }),
      );

    if (userDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userDeckResponse.message,
        userDeckResponse.status,
      );
    }

    if (
      userDeckResponse.item.userId !== request.user.id &&
      !request.user.roles.includes('admin')
    ) {
      throw new HttpException(
        'You can not delete userDeck that do not belong to you',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userDeckDeleteResponse: boolean = await firstValueFrom(
      this.userDeckServiceClient.send('delete_userdeck_by_id', {
        id: params.id,
      }),
    );

    if (!userDeckDeleteResponse) {
      throw new HttpException(
        'UserDeck was not deleted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

@Controller('users')
@ApiTags('UserDeck')
export class UserDeckUserController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
    @Inject('CARD_SERVICE')
    private readonly cardServiceClient: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  @Get(':id/user_decks')
  @Authorization(true)
  @MeToId()
  @ApiOkResponse({
    type: GetUserDecksResponseDto,
  })
  public async getUserDecksByUserId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserDecksResponseDto> {
    const userResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    // get userDecks by user id
    const userDeckResponse: GetResponseArray<IUserDeckPartial> =
      await firstValueFrom(
        this.userDeckServiceClient.send('get_userdecks_by_user_id', {
          params,
          query,
        }),
      );

    if (userDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userDeckResponse.message,
        userDeckResponse.status,
      );
    }

    // get all unique cardSetIds
    const cardSetIds = userDeckResponse.items
      .map((item) => item.cardSets)
      .flat()
      .map((item) => item.cardSetId)
      .filter((value, index, self) => self.indexOf(value) === index);

    // get cardSets by cardSetIds
    const cardSetsResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets_by_ids', {
          ids: cardSetIds,
        }),
      );

    if (cardSetsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardSetsResponse.message,
        cardSetsResponse.status,
      );
    }

    // create response with combined data of userDecks and cardSets
    const result: GetUserDecksResponseDto = {
      data: userDeckResponse.items.map((partialUserDeck) => {
        const userDeck: IUserDeck = {
          id: partialUserDeck.id,
          userId: partialUserDeck.userId,
          name: partialUserDeck.name,
          cardSets: partialUserDeck.cardSets.map((partialCardSet) => {
            const cardSet: IUserCardSet = {
              id: partialCardSet.id,
              userId: partialCardSet.userId,
              cardSet: cardSetsResponse.items.find(
                (item) => item.id === partialCardSet.cardSetId,
              ),
            };
            return cardSet;
          }),
        };
        return userDeck;
      }),
    };

    return result;
  }
}
