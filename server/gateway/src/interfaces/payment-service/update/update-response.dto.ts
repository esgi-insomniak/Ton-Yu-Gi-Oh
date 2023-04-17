import { ApiProperty } from '@nestjs/swagger';
import { IUpdateCheckout } from './update.interface';

export class UpdateCheckoutResponse {
  @ApiProperty({
    example: {
      sessionId:
        'cs_test_a1oZuBfNi4fLBgoZfiHGNzOVhrrefs2kbwxGsxS12UX7Zx45TnBs1sMWbj',
      paymentStatus: 'paid',
    },
  })
  data: IUpdateCheckout;
}
