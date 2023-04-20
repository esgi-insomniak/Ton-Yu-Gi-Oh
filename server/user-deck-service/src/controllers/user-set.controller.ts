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

  @MessagePattern('get_usersets')
  public async getUserSets(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserSet>> {
    const userSets = await this.userSetService.getUserSets(query);
    const result: GetResponseArray<UserSet> = {
      status: HttpStatus.OK,
      items: userSets,
    };

    return result;
  }

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
}
