import { ApiProperty } from '@nestjs/swagger';

export class GetCardsQueryDto {
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;
}
