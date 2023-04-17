import { ApiProperty } from '@nestjs/swagger';
import { ICheckout } from './checkout.interface';

export class CreateCheckoutResponseDto {
  @ApiProperty({
    example: {
      sessionId:
        'cs_test_a1oZuBfNi4fLBgoZfiHGNzOVhrrefs2kbwxGsxS12UX7Zx45TnBs1sMWbj',
      paymentStatus: 'unpaid',
      url: 'https://checkout.stripe.com/c/pay/cs_test_a1oZuBfNi4fLBgoZfiHGNzOVhrrefs2kbwxGsxS12UX7Zx45TnBs1sMWbj#fidkdWxOYHwnPyd1blpxYHZxWjA0SGZQSVNJYmxTfTY0RmB9TEtiQnYyQWJoajQ8VXczbFVhTlxBaUN3dHRAcmxEN1BNR0xdPTBjQjxpR0J2UUkwUXdzbmdtdWRpX1NVV2dWSWxdSUNwcWcwNTVwYDI1VEFScycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl',
      coins: 1500,
    },
  })
  data: ICheckout;
}
