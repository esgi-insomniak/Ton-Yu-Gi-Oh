import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class RarityFiltersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  rarityId: string;
}
