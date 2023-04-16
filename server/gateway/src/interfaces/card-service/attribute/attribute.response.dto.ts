import { ApiProperty } from '@nestjs/swagger';
import { ICardAttribute } from './attribute.interface';

export class GetCardAttributesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '779b2922-e9d4-48a3-a194-a40c9ec4bcbf',
        name: 'FIRE',
      },
    ],
  })
  data: ICardAttribute[];
}

export class GetCardAttributeByIdResponseDto {
  @ApiProperty({
    example: {
      id: '779b2922-e9d4-48a3-a194-a40c9ec4bcbf',
      name: 'FIRE',
    },
  })
  data: ICardAttribute;
}
