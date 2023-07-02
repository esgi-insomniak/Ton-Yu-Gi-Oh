import { Injectable } from '@nestjs/common';
import { Race } from 'src/entities/race.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class RaceService {
  constructor(private readonly dataSource: DataSource) {}

  async getRaces(query: QueryGetItems): Promise<Race[]> {
    const races = await this.dataSource.getRepository(Race).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return races;
  }

  async getRaceById(id: string): Promise<Race> {
    const race = await this.dataSource.getRepository(Race).findOne({
      where: { id },
    });
    return race;
  }
}
