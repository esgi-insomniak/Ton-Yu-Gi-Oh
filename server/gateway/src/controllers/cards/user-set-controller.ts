import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
  Post,
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
  @ApiOperation({
    summary: 'NOT IMPLEMENTED YET',
  })
  public async openUserSet(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserCardSetsResponseDto> {
    return;
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
