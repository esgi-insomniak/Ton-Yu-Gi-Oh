import { ApiProperty } from '@nestjs/swagger';
import { ICardFrameType } from './frame-type.interface';

export class GetCardFrameTypesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '9bc01551-e818-4d2a-95d7-469a002592ae',
        name: 'spell',
      },
    ],
  })
  data: ICardFrameType[];
}

export class GetCardFrameTypeByIdResponseDto {
  @ApiProperty({
    example: {
      id: '9bc01551-e818-4d2a-95d7-469a002592ae',
      name: 'spell',
    },
  })
  data: ICardFrameType;
}
