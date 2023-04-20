import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Set } from 'src/entities/set.entity';
import { SetService } from 'src/services/set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @MessagePattern('get_sets')
  public async getSets(query: QueryGetItems): Promise<GetResponseArray<Set>> {
    const sets = await this.setService.getSets(query);
    const result: GetResponseArray<Set> = {
      status: HttpStatus.OK,
      items: sets,
    };

    return result;
  }

  @MessagePattern('get_set_by_id')
  public async getSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Set>> {
    const set = await this.setService.getSetById(params.id);
    const result: GetResponseOne<Set> = {
      status: set ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: set ? null : 'Set not found',
      item: set,
    };

    return result;
  }
}
