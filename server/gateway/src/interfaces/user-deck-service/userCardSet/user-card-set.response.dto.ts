import { ApiProperty } from '@nestjs/swagger';
import { IUserCardSet } from './user-card-set.interface';

export class GetUserCardSetsResponseDto {
  @ApiProperty({
    example: [],
  })
  data: IUserCardSet[];
}

export class GetUserCardSetByIdResponseDto {
  @ApiProperty({
    example: {},
  })
  data: IUserCardSet;
}
