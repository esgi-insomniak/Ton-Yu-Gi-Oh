import { ApiProperty } from '@nestjs/swagger';
import { IAuction } from './user-auction.interface';

export class PostAuctionBodyDto {
  @ApiProperty({
    example: [
      {
        id: '4391652e-fdc0-4b05-ac70-a15be129eeac',
        userCardSetId: '5f75cd37-c5aa-41c1-bb54-7be8d45447601',
        createdAt: new Date(),
        duration: 30,
        minimalPrice: 100,
        currentPrice: 100,
        isClosed: false,
      },
    ],
  })
  data: IAuction;
}

export class GetActualAuctionResponseBodyDto {
    @ApiProperty({
      example: [
        {
          id: '4391652e-fdc0-4b05-ac70-a15be129eeac',
          userCardSetId: '5f75cd37-c5aa-41c1-bb54-7be8d45447601',
          createdAt: new Date(),
          duration: 30,
          minimalPrice: 100,
          currentPrice: 100,
          isClosed: false,
        },
      ],
    })
    data: IAuction;
  }