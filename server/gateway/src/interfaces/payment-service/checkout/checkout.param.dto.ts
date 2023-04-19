import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaymentCheckoutBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  sessionId: string;
}
