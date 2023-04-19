import { ApiProperty } from '@nestjs/swagger';
import { IPaymentHistory } from './payment-history.interface';

export class GetPaymentHistoriesResponseDto {
  @ApiProperty({
    example: [],
  })
  data: IPaymentHistory[];
}
