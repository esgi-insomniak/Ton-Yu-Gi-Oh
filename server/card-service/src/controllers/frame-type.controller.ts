import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { FrameType } from 'src/entities/frameType.entity';
import { FrameTypeService } from 'src/services/frame-type.service';

@Controller('frame_type')
export class FrameTypeController {
  constructor(private readonly frameTypeService: FrameTypeService) {}

  @MessagePattern('get_frametypes')
  public async getFrameTypes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<FrameType>> {
    const frameTypes = await this.frameTypeService.getFrameTypes(query);
    const result: GetResponseArray<FrameType> = {
      status: HttpStatus.OK,
      items: frameTypes,
    };

    return result;
  }

  @MessagePattern('get_frametype_by_id')
  public async getFrameTypeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<FrameType>> {
    const frameType = await this.frameTypeService.getFrameTypeById(params.id);
    const result: GetResponseOne<FrameType> = {
      status: frameType ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: frameType ? null : 'FrameType not found',
      item: frameType,
    };

    return result;
  }
}
