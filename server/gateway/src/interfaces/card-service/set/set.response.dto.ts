import { ApiProperty } from '@nestjs/swagger';
import { ICardSet } from './set.interface';

export class GetCardSetsResponseDto {
  @ApiProperty({
    example: [
      {
        id: '024b12d6-b85b-4639-84e1-93eb9d18b565',
        name: 'The Lost Art Promotion K',
        code: 'LART',
        image: 'https://images.ygoprodeck.com/images/sets/LART.jpg',
      },
    ],
  })
  data: ICardSet[];
}

export class GetCardSetByIdResponseDto {
  @ApiProperty({
    example: {
      id: '024b12d6-b85b-4639-84e1-93eb9d18b565',
      name: 'The Lost Art Promotion K',
      code: 'LART',
      image: 'https://images.ygoprodeck.com/images/sets/LART.jpg',
      cardSets: [
        {
          id: '4060c74d-a390-468d-853e-ace98cdf197e',
          card: '6fb0b147-45b0-4182-bcfe-97361fb14ebc',
          set: '024b12d6-b85b-4639-84e1-93eb9d18b565',
          price: 18.51,
        },
      ],
    },
  })
  data: ICardSet;
}
