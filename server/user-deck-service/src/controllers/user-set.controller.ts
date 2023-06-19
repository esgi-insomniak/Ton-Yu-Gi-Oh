import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { UserSet } from 'src/entities/user-set.entity';
import { UserSetService } from 'src/services/user-set.service';

@Controller('user_set')
export class UserSetController {
  constructor(private readonly userSetService: UserSetService) {}

  @MessagePattern('get_userset_by_id')
  public async getUserSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserSet>> {
    const userSet = await this.userSetService.getUserSetById(params.id);
    const result: GetResponseOne<UserSet> = {
      status: userSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userSet ? null : 'UserSet not found',
      item: userSet,
    };

    return result;
  }

  @MessagePattern('get_usersets_by_user_id')
  public async getUserSetsByUserId(request: {
    params: ParamGetItemById;
    query: QueryGetItems;
  }): Promise<GetResponseArray<UserSet>> {
    const userSets = await this.userSetService.getUserSetsByUserId(
      request.params.id,
      request.query,
    );
    const result: GetResponseArray<UserSet> = {
      status: HttpStatus.OK,
      message: null,
      items: userSets,
    };

    return result;
  }

  @MessagePattern('create_usersets')
  public async createUserSets(params: {
    userId: string;
    setId: string;
    amount: number;
  }): Promise<GetResponseArray<UserSet>> {
    let result: GetResponseArray<UserSet> = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Invalid params provided',
      items: [],
    };

    try {
      const userSets = await this.userSetService.createUserSets(params);
      result = {
        status: HttpStatus.CREATED,
        message: null,
        items: userSets,
      };
    } catch (error) {}

    return result;
  }

  @MessagePattern('delete_userset_by_id')
  public async deleteUserSetById(params: ParamGetItemById): Promise<boolean> {
    return await this.userSetService.deleteUserSetById(params.id);
  }
}
