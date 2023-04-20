import { Injectable } from '@nestjs/common';
import { Rarity } from 'src/entities/rarity.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class RarityService {
  constructor(private readonly dataSource: DataSource) {}

  async getRarities(query: QueryGetItems): Promise<Rarity[]> {
    const rarities = await this.dataSource.getRepository(Rarity).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return rarities;
  }

  async getRarityById(id: string): Promise<Rarity> {
    const rarity = await this.dataSource.getRepository(Rarity).findOne({
      where: { id },
    });
    return rarity;
  }
}
