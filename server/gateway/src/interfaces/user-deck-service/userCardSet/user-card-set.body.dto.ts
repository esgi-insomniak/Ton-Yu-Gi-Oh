import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';

export class GetScrapUserCardSetByIdsDto {
  @ApiProperty({ type: [String], items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(60)
  userCardSetIds: string[];
}
