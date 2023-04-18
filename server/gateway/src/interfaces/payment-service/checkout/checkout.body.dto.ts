import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentCheckoutBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  productId: string;
}
