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
  GetUserSetByIdResponseDto,
  GetUserSetsResponseDto,
} from 'src/interfaces/user-deck-service/userSet/user-set.response.dto';
import { IUserSet } from 'src/interfaces/user-deck-service/userSet/user-set.interface';

@Controller('user_sets')
@ApiTags('UserSet')
export class UserSetController {
  constructor(
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetUserSetsResponseDto,
  })
  public async getUserSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserSetsResponseDto> {
    const userSetResponse: GetResponseArray<IUserSet> = await firstValueFrom(
      this.userDeckServiceClient.send('get_usersets', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (userSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(userSetResponse.message, userSetResponse.status);
    }

    const result: GetUserSetsResponseDto = {
      data: userSetResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetUserSetByIdResponseDto,
  })
  public async getUserSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserSetByIdResponseDto> {
    const userSetResponse: GetResponseOne<IUserSet> = await firstValueFrom(
      this.userDeckServiceClient.send('get_userset_by_id', {
        id: params.id,
      }),
    );

    if (userSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(userSetResponse.message, userSetResponse.status);
    }

    const result: GetUserSetByIdResponseDto = {
      data: userSetResponse.item,
    };

    if (userSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, userSetResponse.status);
    }

    return result;
  }
}
