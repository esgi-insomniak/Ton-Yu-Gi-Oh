import {
  Body,
  Controller,
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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { Authorization } from 'src/decorators/authorization.decorator';
import {
  GetUserRelationByIdResponseDto,
  GetUserRelationResponseDto,
} from 'src/interfaces/user-service/userRelation/user-relation.response.dto';
import {
  IUserRelation,
  IUserRelationPartial,
} from 'src/interfaces/user-service/userRelation/user-relation.interface';
import {
  CreateUserRelationBodyDto,
  UpdateUserRelationBodyDto,
} from 'src/interfaces/user-service/userRelation/user-relation.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { IUserRoles } from 'src/interfaces/user-service/user/user.interface';
import { Permission } from 'src/decorators/permission.decorator';

@Controller('users_relations')
@ApiTags('UsersRelation')
export class UserRelationController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Permission([IUserRoles.admin], true)
  @Get()
  @ApiOkResponse({
    type: GetUserRelationResponseDto,
  })
  public async getUserRelations(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUserRelationResponseDto> {
    const userRelationsResponse: GetResponseArray<IUserRelation> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_relations', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (userRelationsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userRelationsResponse.message,
        userRelationsResponse.status,
      );
    }

    const result: GetUserRelationResponseDto = {
      data: userRelationsResponse.items,
    };

    return result;
  }

  @Authorization(true)
  @Get(':id')
  @ApiOkResponse({
    type: GetUserRelationByIdResponseDto,
  })
  public async getUserRelationsById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserRelationByIdResponseDto> {
    const userRelationResponse: GetResponseOne<IUserRelation> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_relation_by_id', {
          id: params.id,
        }),
      );

    if (userRelationResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userRelationResponse.message,
        userRelationResponse.status,
      );
    }

    const result: GetUserRelationByIdResponseDto = {
      data: userRelationResponse.item,
    };

    return result;
  }

  @Authorization(true)
  @Post()
  @ApiCreatedResponse({
    type: GetUserRelationByIdResponseDto,
  })
  public async createUserRelation(
    @Body() body: CreateUserRelationBodyDto,
    @Req() req: IAuthorizedRequest,
  ): Promise<GetUserRelationByIdResponseDto> {
    const newUserRelation: Partial<IUserRelationPartial> = body;

    newUserRelation.relationOwner = req.user.id;

    if (newUserRelation.targetUser === req.user.id) {
      throw new HttpException(
        'You cannot create a relation with yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userResponse = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: newUserRelation.targetUser,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const userRelationResponse: GetResponseOne<IUserRelation> =
      await firstValueFrom(
        this.userServiceClient.send('create_user_relation', newUserRelation),
      );

    if (userRelationResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        userRelationResponse.message,
        userRelationResponse.status,
      );
    }

    const result: GetUserRelationByIdResponseDto = {
      data: userRelationResponse.item,
    };

    return result;
  }

  @Authorization(true)
  @Patch(':id')
  @ApiOkResponse({
    type: GetUserRelationByIdResponseDto,
  })
  public async updateUserRelationById(
    @Param() params: GetItemByIdDto,
    @Body() body: UpdateUserRelationBodyDto,
    @Req() req: IAuthorizedRequest,
  ): Promise<GetUserRelationByIdResponseDto> {
    const updatedUserRelation: Partial<IUserRelation> = body;

    const getUserRelationResponse: GetResponseOne<IUserRelation> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_relation_by_id', {
          id: params.id,
        }),
      );

    if (getUserRelationResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getUserRelationResponse.message,
        getUserRelationResponse.status,
      );
    }

    if (getUserRelationResponse.item.relationOwner.id !== req.user.id) {
      throw new HttpException(
        'You cannot update this relation',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUserRelationResponse: GetResponseOne<IUserRelation> =
      await firstValueFrom(
        this.userServiceClient.send('update_user_relation_by_id', {
          params: {
            id: params.id,
          },
          body: updatedUserRelation,
        }),
      );

    if (updatedUserRelationResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        updatedUserRelationResponse.message,
        updatedUserRelationResponse.status,
      );
    }

    const result: GetUserRelationByIdResponseDto = {
      data: updatedUserRelationResponse.item,
    };

    return result;
  }
}

@Controller('users')
@ApiTags('UsersRelation')
export class UserRelationUserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Get(':id/users_relations')
  @ApiOkResponse({
    type: GetUserRelationResponseDto,
  })
  public async getUsersRelationsByUserId(
    @Param() params: GetItemByIdDto,
    @Query() query: GetItemsPaginationDto,
    @Req() req: IAuthorizedRequest,
  ): Promise<GetUserRelationResponseDto> {
    if (req.user.id !== params.id && !req.user.roles.includes('admin')) {
      throw new HttpException(
        'You are not allowed to access this resource',
        HttpStatus.FORBIDDEN,
      );
    }

    const userRelationsResponse: GetResponseArray<IUserRelation> =
      await firstValueFrom(
        this.userServiceClient.send('get_user_relations_by_user_id', {
          params: { userId: params.id },
          query,
        }),
      );

    if (userRelationsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        userRelationsResponse.message,
        userRelationsResponse.status,
      );
    }

    const result: GetUserRelationResponseDto = {
      data: userRelationsResponse.items,
    };

    return result;
  }
}
