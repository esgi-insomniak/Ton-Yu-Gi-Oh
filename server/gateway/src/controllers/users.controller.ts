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
} from '../interfaces/user-service/user/user-response.dto';
import {
  IUserGetOneResponse,
  IUserGetResponse,
} from '../interfaces/user-service/user/user-response.interface';
import { GetUsersQueryDto } from '../interfaces/user-service/user/user-query.dto';
import { GetUserByIdDto } from '../interfaces/user-service/user/user-param.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import {
  CreateUserBodyDto,
  LoginUserBodyDto,
} from 'src/interfaces/user-service/user/user-body.dto';
import {
  ITokenCreateResponse,
  ITokenDestroyResponse,
} from 'src/interfaces/auth-service/token/token-response.interface';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { Permission } from 'src/decorators/permission.decorator';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) { }

  @Get()
  @Authorization(true)
  @ApiCreatedResponse({
    type: GetUsersResponseDto,
  })
  public async getUsers(
    @Req() request: IAuthorizedRequest,
    @Query() query: GetUsersQueryDto,
  ): Promise<GetUsersResponseDto> {
    const userResponse: IUserGetResponse = await firstValueFrom(
      this.userServiceClient.send('get_users', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const result: GetUsersResponseDto = {
      data: userResponse.users,
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
    @Param() params: GetUserByIdDto,
  ): Promise<GetUserByIdResponseDto> {
    const userResponse: IUserGetOneResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const result: GetUserByIdResponseDto = {
      data: userResponse.user,
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
    const userResponse: IUserGetOneResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_credentials', {
        email: loginRequest.email,
        username: loginRequest.username,
        phone: loginRequest.phone,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const tokenResponse: ITokenCreateResponse = await firstValueFrom(
      this.authServiceClient.send('compare_user_password', {
        userId: userResponse.user.id,
        username: userResponse.user.username,
        email: userResponse.user.email,
        roles: userResponse.user.roles,
        password: loginRequest.password,
      }),
    );

    if (tokenResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(tokenResponse.message, tokenResponse.status);
    }

    const result: LoginUserResponseDto = {
      token: tokenResponse.token.token,
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
    const userResponse: IUserGetOneResponse = await firstValueFrom(
      this.userServiceClient.send('user_create', userRequest),
    );

    if (userResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    await firstValueFrom(
      this.authServiceClient.send('create_basic_auth', {
        userId: userResponse.user.id,
        password: userRequest.password,
      }),
    );

    const result: CreateUserResponseDto = {
      data: userResponse.user,
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

    const destroyTokenResponse: ITokenDestroyResponse = await firstValueFrom(
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
