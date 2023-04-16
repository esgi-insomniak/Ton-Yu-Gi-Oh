import { ApiProperty } from '@nestjs/swagger';
import { ICardLinkMarker } from './link-marker.interface';

export class GetCardLinkMarkersResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'bbd90a83-04d2-4756-b427-842212c849e1',
        name: 'Top',
      },
    ],
  })
  data: ICardLinkMarker[];
}

export class GetCardLinkMarkerByIdResponseDto {
  @ApiProperty({
    example: {
      id: 'bbd90a83-04d2-4756-b427-842212c849e1',
      name: 'Top',
    },
  })
  data: ICardLinkMarker;
}
