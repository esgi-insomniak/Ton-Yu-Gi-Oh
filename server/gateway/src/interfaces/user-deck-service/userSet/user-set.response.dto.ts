import { ApiProperty } from '@nestjs/swagger';
import { IUserSet } from './user-set.interface';

export class GetUserSetsResponseDto {
  @ApiProperty({
    example: [],
  })
  data: IUserSet[];
}

export class GetUserSetByIdResponseDto {
  @ApiProperty({
    example: {},
  })
  data: IUserSet;
}
