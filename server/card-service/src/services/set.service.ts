import { Injectable } from '@nestjs/common';
import { Set } from 'src/entities/set.entity';
import { SetsQuery } from 'src/interfaces/common/common.query.interface';
import { DataSource, In } from 'typeorm';

@Injectable()
export class SetService {
  constructor(private readonly dataSource: DataSource) {}

  async getSets(query: SetsQuery): Promise<Set[]> {
    const sets = await this.dataSource.getRepository(Set).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      where: {
        id: query.setId ? query.setId : null,
        code: query.setCodes ? In(query.setCodes) : null,
      },
    });
    return sets;
  }

  async getSetById(id: string, relations: string[]): Promise<Set> {
    const set = await this.dataSource.getRepository(Set).findOne({
      where: { id },
      relations,
    });
    return set;
  }

  async getSetsByIds(ids: string[]): Promise<Set[]> {
    const sets: Set[] = [];
    for (const id of ids) {
      const set = await this.dataSource.getRepository(Set).findOne({
        where: { id },
      });
      sets.push(set);
    }
    return sets;
  }
}
