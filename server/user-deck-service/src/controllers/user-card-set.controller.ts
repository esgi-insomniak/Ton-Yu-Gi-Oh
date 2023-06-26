import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DefaultResponse,
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { UserCardSetService } from 'src/services/user-card-set.service';
import { UserCardSetsQuery } from 'src/interfaces/common/common.query.interface';

@Controller('user_card_set')
export class UserCardSetController {
  constructor(private readonly userCardSetService: UserCardSetService) {}

  @MessagePattern('get_usercardsets')
  public async getUserCardSets(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserCardSet>> {
    const userCardSets = await this.userCardSetService.getUserCardSets(query);
    const result: GetResponseArray<UserCardSet> = {
      status: HttpStatus.OK,
      items: userCardSets,
    };

    return result;
  }

  @MessagePattern('get_usercardset_by_id')
  public async getUserCardSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserCardSet>> {
    const userCardSet = await this.userCardSetService.getUserCardSetById(
      params.id,
    );
    const result: GetResponseOne<UserCardSet> = {
      status: userCardSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userCardSet ? null : 'UserCardSet not found',
      item: userCardSet,
    };

    return result;
  }

  @MessagePattern('get_usercardsets_by_ids')
  public async getSetsByIds(params: {
    ids: string[];
  }): Promise<GetResponseArray<UserCardSet>> {
    const sets = await this.userCardSetService.getUserCardSetsByIds(params.ids);
    const result: GetResponseArray<UserCardSet> = {
      status: sets ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: sets ? null : 'CardSets not found',
      items: sets,
    };

    return result;
  }

  @MessagePattern('get_usercardsets_by_user_id')
  public async getUserCardSetsByUserId(request: {
    params: ParamGetItemById;
    query: UserCardSetsQuery;
  }): Promise<GetResponseArray<UserCardSet>> {
    const userCardSets = await this.userCardSetService.getUserCardSetsByUserId(
      request.params.id,
    );
    const result: GetResponseArray<UserCardSet> = {
      status: userCardSets ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userCardSets ? null : 'UserCardSets not found',
      items: userCardSets,
    };

    return result;
  }

  @MessagePattern('post_usercardset')
  public async postUserCardSet(query: {
    userId: string;
    cardSetId: string;
  }): Promise<GetResponseOne<UserCardSet>> {
    const userCardSet = await this.userCardSetService.createUserCardSet(query);
    const result: GetResponseOne<UserCardSet> = {
      status: userCardSet ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: userCardSet ? null : 'UserCardSet not created',
      item: userCardSet,
    };

    return result;
  }

  @MessagePattern('post_usercardsets_by_cardset_ids')
  public async postUserCardSetsByCardSetIds(query: {
    userId: string;
    cardSetIds: string[];
  }): Promise<GetResponseArray<UserCardSet>> {
    const userCardSets =
      await this.userCardSetService.createUserCardSetsByCardSetIds(query);
    const result: GetResponseArray<UserCardSet> = {
      status: userCardSets ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: userCardSets ? null : 'UserCardSets not created',
      items: userCardSets,
    };

    return result;
  }

  @MessagePattern('delete_usercardset')
  public async deleteUserCardSet(params: ParamGetItemById) {
    const userCardSetIsDeleted =
      await this.userCardSetService.deleteUserCardSetById(params.id);
    const result: DefaultResponse = {
      status: userCardSetIsDeleted
        ? HttpStatus.NO_CONTENT
        : HttpStatus.NOT_FOUND,
      message: userCardSetIsDeleted ? null : 'UserCardSet not found',
    };

    return result;
  }
}
