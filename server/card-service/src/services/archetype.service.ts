import { Injectable } from '@nestjs/common';
import { Archetype } from 'src/entities/archetype.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class ArchetypeService {
  constructor(private readonly dataSource: DataSource) {}

  async getArchetypes(query: QueryGetItems): Promise<Archetype[]> {
    const archetypes = await this.dataSource.getRepository(Archetype).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return archetypes;
  }

  async getArchetypeById(id: string): Promise<Archetype> {
    const archetype = await this.dataSource.getRepository(Archetype).findOne({
      where: { id },
    });
    return archetype;
  }
}
