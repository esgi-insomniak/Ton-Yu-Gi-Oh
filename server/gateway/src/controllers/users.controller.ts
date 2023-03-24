import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetUserByIdResponseDto,
  GetUsersResponseDto,
} from '../interfaces/user-service/user/user-response.dto';
import {
  IUserGetOneResponse,
  IUserGetResponse,
} from '../interfaces/user-service/user/user-response.interface';
import { GetUsersQueryDto } from '../interfaces/user-service/user/user-query.dto';
import { GetUserByIdDto } from '../interfaces/user-service/user/user-param.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: GetUsersResponseDto,
  })
  public async getUsers(
    @Query() query: GetUsersQueryDto,
  ): Promise<GetUsersResponseDto> {
    const userResponse: IUserGetResponse = await firstValueFrom(
      this.userServiceClient.send('get_users', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    return {
      data: {
        users: userResponse.users,
      },
      errors: null,
    };
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetUserByIdResponseDto,
  })
  public async getUserById(
    @Param() params: GetUserByIdDto,
  ): Promise<GetUserByIdResponseDto> {
    const userResponse: IUserGetOneResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    return {
      data: {
        user: userResponse.user,
      },
      errors: null,
    };
  }
}
