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
import { IUserDeck } from 'src/interfaces/user-deck-service/userDeck/user-deck.interface';
import {
  GetUserDeckByIdResponseDto,
  GetUserDecksResponseDto,
} from 'src/interfaces/user-deck-service/userDeck/user-deck.response.dto';

@Controller('user_decks')
@ApiTags('UserDeck')
export class UserDeckController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetUserDecksResponseDto,
  })
  public async getUserDecks(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserDecksResponseDto> {
    const userDeckResponse: GetResponseArray<IUserDeck> = await firstValueFrom(
      this.userDeckServiceClient.send('get_userdecks', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (userDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userDeckResponse.message,
        userDeckResponse.status,
      );
    }

    const result: GetUserDecksResponseDto = {
      data: userDeckResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetUserDeckByIdResponseDto,
  })
  public async getUserDeckById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserDeckByIdResponseDto> {
    const userDeckResponse: GetResponseOne<IUserDeck> = await firstValueFrom(
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

    const result: GetUserDeckByIdResponseDto = {
      data: userDeckResponse.item,
    };

    if (userDeckResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, userDeckResponse.status);
    }

    return result;
  }
}
