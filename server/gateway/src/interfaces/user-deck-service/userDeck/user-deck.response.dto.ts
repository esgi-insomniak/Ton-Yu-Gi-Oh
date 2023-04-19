import { ApiProperty } from '@nestjs/swagger';
import { IUserDeck } from './user-deck.interface';

export class GetUserDecksResponseDto {
  @ApiProperty({
    example: [],
  })
  data: IUserDeck[];
}

export class GetUserDeckByIdResponseDto {
  @ApiProperty({
    example: {},
  })
  data: IUserDeck;
}
