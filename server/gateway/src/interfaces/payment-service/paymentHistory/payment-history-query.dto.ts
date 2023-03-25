import { ApiProperty } from '@nestjs/swagger';

export class GetPaymentHistoriesQueryDto {
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;
}
