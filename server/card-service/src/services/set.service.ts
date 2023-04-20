import { Injectable } from '@nestjs/common';
import { Set } from 'src/entities/set.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class SetService {
  constructor(private readonly dataSource: DataSource) {}

  async getSets(query: QueryGetItems): Promise<Set[]> {
    const sets = await this.dataSource.getRepository(Set).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['cardSets'],
    });
    return sets;
  }

  async getSetById(id: string): Promise<Set> {
    const set = await this.dataSource.getRepository(Set).findOne({
      where: { id },
      relations: ['cardSets'],
    });
    return set;
  }
}
