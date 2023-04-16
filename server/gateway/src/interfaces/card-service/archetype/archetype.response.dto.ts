import { ApiProperty } from '@nestjs/swagger';
import { ICardArchetype } from './archetype.interface';

export class GetCardArchetypesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '443444e0-a19d-46b0-9186-bdee3b9fa413',
        name: 'Noble Knight',
      },
    ],
  })
  data: ICardArchetype[];
}

export class GetCardArchetypeByIdResponseDto {
  @ApiProperty({
    example: {
      id: '443444e0-a19d-46b0-9186-bdee3b9fa413',
      name: 'Noble Knight',
    },
  })
  data: ICardArchetype;
}
