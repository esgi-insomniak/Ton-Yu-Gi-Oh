import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  Put,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserResponseDto,
  GetUserByIdResponseDto,
  GetUsersResponseDto,
  LoginUserResponseDto,
} from '../interfaces/user-service/user/user.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import {
  CreateUserBodyDto,
  LoginUserBodyDto,
} from 'src/interfaces/user-service/user/user.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  DefaultResponse,
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { IUser } from 'src/interfaces/user-service/user/user.interface';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import { IToken } from 'src/interfaces/auth-service/token/token.interface';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetUsersResponseDto,
  })
  public async getUsers(
    @Req() request: IAuthorizedRequest,
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUsersResponseDto> {
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

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginUserResponseDto,
  })
  public async loginUser(
    @Body() loginRequest: LoginUserBodyDto,
  ): Promise<LoginUserResponseDto> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_credentials', {
        email: loginRequest.email,
        username: loginRequest.username,
        phone: loginRequest.phone,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const tokenResponse: GetResponseOne<IToken> = await firstValueFrom(
      this.authServiceClient.send('compare_user_password', {
        userId: userResponse.item.id,
        username: userResponse.item.username,
        email: userResponse.item.email,
        roles: userResponse.item.roles,
        password: loginRequest.password,
      }),
    );

    if (tokenResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(tokenResponse.message, tokenResponse.status);
    }

    const result: LoginUserResponseDto = {
      token: tokenResponse.item.token,
    };

    return result;
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  public async createUser(
    @Body() userRequest: CreateUserBodyDto,
  ): Promise<CreateUserResponseDto> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('user_create', userRequest),
    );

    if (userResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    await firstValueFrom(
      this.authServiceClient.send('create_basic_auth', {
        userId: userResponse.item.id,
        password: userRequest.password,
      }),
    );

    const result: CreateUserResponseDto = {
      data: userResponse.item,
    };

    return result;
  }

  @Put('/logout')
  @Authorization(true)
  @ApiCreatedResponse({
    status: HttpStatus.NO_CONTENT,
  })
  public async logoutUser(@Req() request: IAuthorizedRequest): Promise<void> {
    const userInfo = request.user;

    const destroyTokenResponse: DefaultResponse = await firstValueFrom(
      this.authServiceClient.send('token_destroy', {
        userId: userInfo.id,
      }),
    );

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        destroyTokenResponse.message,
        destroyTokenResponse.status,
      );
    }

    return;
  }
}
