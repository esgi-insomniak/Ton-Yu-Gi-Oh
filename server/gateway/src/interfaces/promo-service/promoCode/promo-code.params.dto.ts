import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GetItemByCodeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;
}
