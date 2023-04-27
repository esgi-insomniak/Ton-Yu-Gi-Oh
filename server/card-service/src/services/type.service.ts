import { Injectable } from '@nestjs/common';
import { Type } from 'src/entities/type.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeService {
  constructor(private readonly dataSource: DataSource) {}

  async getTypes(query: QueryGetItems): Promise<Type[]> {
    const types = await this.dataSource.getRepository(Type).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return types;
  }

  async getTypeById(id: string): Promise<Type> {
    const type = await this.dataSource.getRepository(Type).findOne({
      where: { id },
    });
    return type;
  }
}
