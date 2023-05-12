import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CardFiltersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  archetypeId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  attributeId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  frameTypeId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  raceId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  typeId: string;
}
