import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuctionBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  userCardSetId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  duration: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  minimalPrice: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  currentPrice: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  isClosed: boolean;
}