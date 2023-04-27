import { Injectable } from '@nestjs/common';
import { FrameType } from 'src/entities/frameType.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class FrameTypeService {
  constructor(private readonly dataSource: DataSource) {}

  async getFrameTypes(query: QueryGetItems): Promise<FrameType[]> {
    const frameTypes = await this.dataSource.getRepository(FrameType).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return frameTypes;
  }

  async getFrameTypeById(id: string): Promise<FrameType> {
    const frameType = await this.dataSource.getRepository(FrameType).findOne({
      where: { id },
    });
    return frameType;
  }
}
