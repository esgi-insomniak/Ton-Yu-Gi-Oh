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
import { SetsQuery } from 'src/interfaces/common/common.query.interface';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @MessagePattern('get_sets')
  public async getSets(query: SetsQuery): Promise<GetResponseArray<Set>> {
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

  @MessagePattern('get_sets_by_ids')
  public async getSetsByIds(params: {
    ids: string[];
  }): Promise<GetResponseArray<Set>> {
    const sets = await this.setService.getSetsByIds(params.ids);
    const result: GetResponseArray<Set> = {
      status: sets ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: sets ? null : 'Sets not found',
      items: sets,
    };

    return result;
  }
}
