import { ApiProperty } from '@nestjs/swagger';
import { IPaymentHistory } from './payment-history.interface';

export class GetPaymentHistoriesResponseDto {
  @ApiProperty({
    example: {
      payments: [
        
      ],
    },
  })
  data: {
    payments: IPaymentHistory[];
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}