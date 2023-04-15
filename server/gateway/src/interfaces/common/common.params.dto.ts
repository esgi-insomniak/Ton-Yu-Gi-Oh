import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetItemByIdDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
