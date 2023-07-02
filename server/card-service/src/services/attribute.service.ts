import { Injectable } from '@nestjs/common';
import { Attribute } from 'src/entities/attribute.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class AttributeService {
  constructor(private readonly dataSource: DataSource) {}

  async getAttributes(query: QueryGetItems): Promise<Attribute[]> {
    const attributes = await this.dataSource.getRepository(Attribute).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return attributes;
  }

  async getAttributeById(id: string): Promise<Attribute> {
    const attribute = await this.dataSource.getRepository(Attribute).findOne({
      where: { id },
    });
    return attribute;
  }
}
