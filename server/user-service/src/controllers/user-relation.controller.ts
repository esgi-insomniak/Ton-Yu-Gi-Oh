import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserRelation } from 'src/entities/userRelation.entity';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { UserRelationService } from 'src/services/user-relation.service';
import { DeepPartial } from 'typeorm';

@Controller('user-relation')
export class UserRelationController {
  constructor(private readonly userRelationService: UserRelationService) {}

  @MessagePattern('get_user_relations')
  public async getUserRelations(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserRelation>> {
    const userRelations = await this.userRelationService.getUserRelations(
      query,
    );
    const result: GetResponseArray<UserRelation> = {
      status: HttpStatus.OK,
      items: userRelations,
    };

    return result;
  }

  @MessagePattern('get_user_relations_by_user_id')
  public async getUserRelationsByUserId(request: {
    params: { userId: string };
    query: QueryGetItems;
  }): Promise<GetResponseArray<UserRelation>> {
    const userRelations =
      await this.userRelationService.getUserRelationsByUserId(
        request.params.userId,
        request.query,
      );
    const result: GetResponseArray<UserRelation> = {
      status: HttpStatus.OK,
      items: userRelations,
    };

    return result;
  }

  @MessagePattern('get_user_relation_by_id')
  public async getUserRelationById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserRelation>> {
    const userRelation = await this.userRelationService.getUserRelationById(
      params,
    );
    const result: GetResponseOne<UserRelation> = {
      status: userRelation !== null ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userRelation !== null ? null : 'UserRelation not found',
      item: userRelation,
    };

    return result;
  }

  @MessagePattern('create_user_relation')
  public async createUserRelation(
    body: DeepPartial<UserRelation>,
  ): Promise<GetResponseOne<UserRelation>> {
    const userRelation = await this.userRelationService.createUserRelation(
      body,
    );
    const result: GetResponseOne<UserRelation> = {
      status: userRelation ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: userRelation ? null : 'UserRelation not created',
      item: userRelation,
    };

    return result;
  }

  @MessagePattern('update_user_relation_by_id')
  public async updateUserExchangeById(request: {
    params: ParamGetItemById;
    body: UserRelation;
  }): Promise<GetResponseOne<UserRelation>> {
    const userRelation = await this.userRelationService.updateUserRelationById(
      request.params.id,
      request.body,
    );
    const result: GetResponseOne<UserRelation> = {
      status: userRelation ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userRelation ? null : 'UserRelation not found',
      item: userRelation,
    };

    return result;
  }
}
