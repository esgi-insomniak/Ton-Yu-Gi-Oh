import { ApiProperty } from '@nestjs/swagger';
import { IPaymentHistory } from './payment-history.interface';

export class GetPaymentHistoriesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '33dfa000-c9d0-4ace-a364-23453c882ce4',
        userId: '10b6488d-3eba-4c1f-aaf9-bbb2364af35b',
        coinsAmount: 100,
        stripeInfo:
          '{"sessionId":"ef2ba890-a51b-4411-83f5-e326aac274ed","paymentStatus":"paid","url":"https://checkout.stripe.com/c/pay/cs_test_a1pgWJQwthKTLMSrgSoe0iCidIysSzK0dNc5nkgNsq4jzN7wszfvNLZgu2#fidkdWxOYHwnPyd1blpxYHZxWjA0SGZQSVNJYmxTfTY0RmB9TEtiQnYyQWJoajQ8VXczbFVhTlxBaUN3dHRAcmxEN1BNR0xdPTBjQjxpR0J2UUkwUXdzbmdtdWRpX1NVV2dWSWxdSUNwcWcwNTVwYDI1VEFScycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl","coins":100}',
      },
    ],
  })
  data: IPaymentHistory[];
}
