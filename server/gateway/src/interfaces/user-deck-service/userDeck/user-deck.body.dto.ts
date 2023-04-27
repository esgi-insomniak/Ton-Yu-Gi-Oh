import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateUserDeckBodyDto {
  @ApiProperty({ type: [String], items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayUnique()
  @ArrayMinSize(40)
  @ArrayMaxSize(60)
  userCardSetIds: string[];
}

export class UpdateUserDeckBodyDto {
  @ApiProperty({ type: [String], items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayUnique()
  @ArrayMinSize(40)
  @ArrayMaxSize(60)
  userCardSetIds: string[];
}
