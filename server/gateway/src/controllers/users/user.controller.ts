import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  Req,
  Patch,
  SerializeOptions,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserResponseDto,
  GetUserByIdResponseDto,
  GetUsersResponseDto,
} from '../../interfaces/user-service/user/user.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
} from 'src/interfaces/user-service/user/user.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import {
  IUser,
  IUserRoles,
} from 'src/interfaces/user-service/user/user.interface';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import { Permission } from 'src/decorators/permission.decorator';
import { IBasicAuth } from 'src/interfaces/auth-service/auth/basic-auth.interface';
import { GetUsersQuery } from 'src/interfaces/user-service/user/user.query.dto';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';
import { MeToId } from 'src/decorators/me-to-id.decorator';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetUsersResponseDto,
  })
  public async getUsers(
    @Req() request: IAuthorizedRequest,
    @Query() query: GetUsersQuery,
  ): Promise<GetUsersResponseDto> {
    // get differents users by cardSetId
    if (query.cardSetId) {
      const cardSetResponse: GetResponseOne<ICardCardSet> =
        await firstValueFrom(
          this.cardServiceClient.send('get_cardset_by_id', {
            id: query.cardSetId,
          }),
        );

      if (cardSetResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          cardSetResponse.message,
          cardSetResponse.status,
        );
      }

      const userIdsResponse: GetResponseArray<string> = await firstValueFrom(
        this.userDeckServiceClient.send('get_users_ids_by_cardset_id', {
          params: {
            cardSetId: query.cardSetId,
          },
          query,
        }),
      );

      const usersResponse: GetResponseArray<IUser> = await firstValueFrom(
        this.userServiceClient.send('get_users_by_ids', {
          ids: userIdsResponse.items,
        }),
      );

      if (usersResponse.status !== HttpStatus.OK) {
        throw new HttpException(usersResponse.message, usersResponse.status);
      }

      const result: GetUsersResponseDto = {
        data: usersResponse.items,
      };

      return result;
    }

    const userResponse: GetResponseArray<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_users', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const result: GetUsersResponseDto = {
      data: userResponse.items,
    };

    return result;
  }

  @Get(':id')
  @Authorization(true)
  @MeToId()
  @ApiOkResponse({
    type: GetUserByIdResponseDto,
  })
  public async getUserById(
    @Req() request: IAuthorizedRequest,
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserByIdResponseDto> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const result: GetUserByIdResponseDto = {
      data: userResponse.item,
    };

    return result;
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  public async createUser(
    @Body() body: CreateUserBodyDto,
  ): Promise<CreateUserResponseDto> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('user_create', body),
    );

    if (userResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const basicAuthResponse: GetResponseOne<IBasicAuth> = await firstValueFrom(
      this.authServiceClient.send('create_basic_auth', {
        userId: userResponse.item.id,
        password: body.password,
      }),
    );

    if (basicAuthResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        basicAuthResponse.message,
        basicAuthResponse.status,
      );
    }

    // Send confirmation
    await firstValueFrom(
      this.mailerServiceClient.send('send_confirmation_email', {
        email: userResponse.item.email,
        username: userResponse.item.username,
        token: basicAuthResponse.item.confirmationToken,
      }),
    );

    const result: CreateUserResponseDto = {
      data: userResponse.item,
    };

    return result;
  }

  @Authorization(true)
  @MeToId()
  @Patch(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiOkResponse({
    type: GetUserByIdResponseDto,
  })
  public async updateUser(
    @Req() request: IAuthorizedRequest,
    @Param() params: GetItemByIdDto,
    @Body() body: UpdateUserBodyDto,
  ): Promise<GetUserByIdResponseDto> {
    if (!request.user.roles.includes(IUserRoles.admin)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const userPartial: Partial<IUser> = body;

    const updatedUserResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('update_user_by_id', {
        params: {
          id: params.id,
        },
        body: userPartial,
      }),
    );

    if (updatedUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        updatedUserResponse.message,
        updatedUserResponse.status,
      );
    }

    const result: GetUserByIdResponseDto = {
      data: updatedUserResponse.item,
    };

    return result;
  }
}
