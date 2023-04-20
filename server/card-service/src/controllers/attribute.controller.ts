import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Attribute } from 'src/entities/attribute.entity';
import { AttributeService } from 'src/services/attribute.service';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern('get_attributes')
  public async getAttributes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Attribute>> {
    const attributes = await this.attributeService.getAttributes(query);
    const result: GetResponseArray<Attribute> = {
      status: HttpStatus.OK,
      items: attributes,
    };

    return result;
  }

  @MessagePattern('get_attribute_by_id')
  public async getAttributeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Attribute>> {
    const attribute = await this.attributeService.getAttributeById(params.id);
    const result: GetResponseOne<Attribute> = {
      status: attribute ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: attribute ? null : 'Attribute not found',
      item: attribute,
    };

    return result;
  }
}
