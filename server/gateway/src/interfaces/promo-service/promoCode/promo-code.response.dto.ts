import { ApiProperty } from '@nestjs/swagger';
import { IPromoCode } from './promo-code.interface';

export class GetPromoCodesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '25d10333-dc90-44f6-9f23-ba7264938231',
        code: 'WELCOME',
        rewardCoinsAmount: 100,
        rewardSetId: null,
        rewardSetAmount: null,
        expirationDate: '2023-06-21T12:38:39.341Z',
      },
    ],
  })
  data: IPromoCode[];
}

export class GetPromoCodeByIdResponseDto {
  @ApiProperty({
    example: {
      id: '25d10333-dc90-44f6-9f23-ba7264938231',
      code: 'WELCOME',
      rewardCoinsAmount: 100,
      rewardSetId: null,
      rewardSetAmount: null,
      expirationDate: '2023-06-21T12:38:39.341Z',
    },
  })
  data: IPromoCode;
}
