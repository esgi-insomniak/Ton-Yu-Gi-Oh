import { ApiProperty } from '@nestjs/swagger';
import { ICardRace } from './race.interface';

export class GetCardRacesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '94367b7b-0837-4d4f-a4c6-a3d4eb02c418',
        name: 'Equip',
      },
    ],
  })
  data: ICardRace[];
}

export class GetCardRaceByIdResponseDto {
  @ApiProperty({
    example: {
      id: '94367b7b-0837-4d4f-a4c6-a3d4eb02c418',
      name: 'Equip',
    },
  })
  data: ICardRace;
}
