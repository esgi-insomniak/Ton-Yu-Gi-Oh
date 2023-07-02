import { Injectable } from '@nestjs/common';
import { LinkMarker } from 'src/entities/linkMarker.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class LinkMarkerService {
  constructor(private readonly dataSource: DataSource) {}

  async getLinkMarkers(query: QueryGetItems): Promise<LinkMarker[]> {
    const linkMarkers = await this.dataSource.getRepository(LinkMarker).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return linkMarkers;
  }

  async getLinkMarkerById(id: string): Promise<LinkMarker> {
    const linkMarker = await this.dataSource.getRepository(LinkMarker).findOne({
      where: { id },
    });
    return linkMarker;
  }
}
