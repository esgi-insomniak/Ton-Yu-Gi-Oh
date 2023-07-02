import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDeckBodyDto {
  @ApiProperty({ type: [String], items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayUnique()
  @ArrayMinSize(40)
  @ArrayMaxSize(60)
  userCardSetIds: string[];

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}

export class UpdateUserDeckBodyDto {
  @ApiProperty({ type: [String], items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayUnique()
  @ArrayMinSize(40)
  @ArrayMaxSize(60)
  userCardSetIds: string[];

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
