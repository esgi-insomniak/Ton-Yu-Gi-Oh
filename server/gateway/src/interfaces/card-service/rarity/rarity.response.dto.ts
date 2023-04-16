import { ApiProperty } from '@nestjs/swagger';
import { ICardRarity } from './rarity.interface';

export class GetCardRaritiesResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'cdbbfab7-258d-4fe9-8c70-bfe4edde07ea',
        name: 'Super Rare',
        code: 'SR',
      },
    ],
  })
  data: ICardRarity[];
}

export class GetCardRarityByIdResponseDto {
  @ApiProperty({
    example: {
      id: 'cdbbfab7-258d-4fe9-8c70-bfe4edde07ea',
      name: 'Super Rare',
      code: 'SR',
    },
  })
  data: ICardRarity;
}
