import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateAuctionBodyDto {
  @IsUUID(4)
  cardSetId: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  duration: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  currentPrice: number;
}
