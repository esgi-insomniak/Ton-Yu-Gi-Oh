import { ApiProperty } from '@nestjs/swagger';

export class GetUsersQueryDto {
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;
}
