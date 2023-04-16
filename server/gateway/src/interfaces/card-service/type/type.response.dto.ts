import { ApiProperty } from '@nestjs/swagger';
import { ICardType } from './type.interface';

export class GetCardTypesResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'f62bf486-6ef8-430a-ad53-64d924bcf1d2',
        name: 'Spell Card',
      },
    ],
  })
  data: ICardType[];
}

export class GetCardTypeByIdResponseDto {
  @ApiProperty({
    example: {
      id: 'f62bf486-6ef8-430a-ad53-64d924bcf1d2',
      name: 'Spell Card',
    },
  })
  data: ICardType;
}
