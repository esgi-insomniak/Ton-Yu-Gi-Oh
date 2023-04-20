import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Type } from 'src/entities/type.entity';
import { TypeService } from 'src/services/type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @MessagePattern('get_types')
  public async getTypes(query: QueryGetItems): Promise<GetResponseArray<Type>> {
    const types = await this.typeService.getTypes(query);
    const result: GetResponseArray<Type> = {
      status: HttpStatus.OK,
      items: types,
    };

    return result;
  }

  @MessagePattern('get_type_by_id')
  public async getTypeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Type>> {
    const type = await this.typeService.getTypeById(params.id);
    const result: GetResponseOne<Type> = {
      status: type ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: type ? null : 'Type not found',
      item: type,
    };

    return result;
  }
}
