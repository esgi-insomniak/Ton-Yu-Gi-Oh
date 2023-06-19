import { Injectable } from '@nestjs/common';
import { RarityDropTable } from 'src/entities/rarityDropTable.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class RarityDropTableService {
  constructor(private readonly dataSource: DataSource) {}

  async getRarityDropTables(query: QueryGetItems): Promise<RarityDropTable[]> {
    const rariryDropTables = await this.dataSource
      .getRepository(RarityDropTable)
      .find({
        take: query.limit || 20,
        skip: query.offset * query.limit || 0,
        relations: ['rarities'],
      });
    return rariryDropTables;
  }

  async getRarityDropTableById(id: string): Promise<RarityDropTable> {
    const rariryDropTable = await this.dataSource
      .getRepository(RarityDropTable)
      .findOne({
        where: { id },
        relations: ['rarities'],
      });
    return rariryDropTable;
  }
}
