import { ApiProperty } from '@nestjs/swagger';
import { IAuctionHistory } from './user-auction.interface';

export class GetAuctionHistoriesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '4391652e-fdc0-4b05-ac70-a15be129eeac',
        price: 30,
        userId: '5f75cd37-c5aa-41c1-bb54-7be8d45447601',
        createdAt: new Date(),
      },
    ],
  })
  data: IAuctionHistory[];
}

export class GetAuctionHistoryByIdResponseDto {
  @ApiProperty({
    example: {
      id: '4391652e-fdc0-4b05-ac70-a15be129eeac',
      price: 30,
      userId: '5f75cd37-c5aa-41c1-bb54-7be8d45447601',
      createdAt: new Date(),
    },
  })
  data: IAuctionHistory;
}
