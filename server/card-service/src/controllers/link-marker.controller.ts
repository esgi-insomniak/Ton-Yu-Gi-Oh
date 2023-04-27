import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { LinkMarker } from 'src/entities/linkMarker.entity';
import { LinkMarkerService } from 'src/services/link-marker.service';

@Controller('link_marker')
export class LinkMarkerController {
  constructor(private readonly linkMarkerService: LinkMarkerService) {}

  @MessagePattern('get_linkmarkers')
  public async getLinkMarkers(
    query: QueryGetItems,
  ): Promise<GetResponseArray<LinkMarker>> {
    const linkMarkers = await this.linkMarkerService.getLinkMarkers(query);
    const result: GetResponseArray<LinkMarker> = {
      status: HttpStatus.OK,
      items: linkMarkers,
    };

    return result;
  }

  @MessagePattern('get_linkmarker_by_id')
  public async getLinkMarkerById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<LinkMarker>> {
    const linkMarker = await this.linkMarkerService.getLinkMarkerById(
      params.id,
    );
    const result: GetResponseOne<LinkMarker> = {
      status: linkMarker ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: linkMarker ? null : 'LinkMarker not found',
      item: linkMarker,
    };

    return result;
  }
}
