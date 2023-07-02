import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';

export class SetFiltersDto {
  @ApiProperty({ type: [String], items: { type: 'string' }, required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  setCodes: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  setId: string;
}

export class GetSetsQueryDto extends IntersectionType(
  GetItemsPaginationDto,
  SetFiltersDto,
) {}
