import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './user.interface';

export class GetUsersResponseDto {
  @ApiProperty({
    example: {
      users: [
        {
          id: '9249ed40-1826-4a1f-bdaf-bfe49b96e1fe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.fr',
          phone: '0123456789',
          coins: 10,
          sets: [
            {
              id: 'feba4a4a-8247-4159-be98-b6047e0698f1',
              setId: '45598ae5-db16-4518-8478-fc5832b0929b',
            },
          ],
          cardSets: [
            {
              id: 'cf76007f-3541-4c92-8355-dd9d904b49e0',
              cardSetId: 'd526c008-da60-4b81-9317-397efa120ea0',
            },
            {
              id: 'f2ff7a7f-a1aa-4ca7-b3e4-bd5d1e996df9',
              cardSetId: '7a031bf8-0e11-4339-aae0-167c7855a01a',
            },
          ],
          decks: [
            {
              id: 'fa3a51e4-8a61-4a4a-b2a6-404405b02ebe',
            },
          ],
        },
      ],
    },
  })
  data: {
    users: IUser[];
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}

export class GetUserByIdResponseDto {
  @ApiProperty({
    example: {
      user: {
        id: '9249ed40-1826-4a1f-bdaf-bfe49b96e1fe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.fr',
        phone: '0123456789',
        coins: 10,
        sets: [
          {
            id: 'feba4a4a-8247-4159-be98-b6047e0698f1',
            setId: '45598ae5-db16-4518-8478-fc5832b0929b',
          },
        ],
        cardSets: [
          {
            id: 'cf76007f-3541-4c92-8355-dd9d904b49e0',
            cardSetId: 'd526c008-da60-4b81-9317-397efa120ea0',
          },
          {
            id: 'f2ff7a7f-a1aa-4ca7-b3e4-bd5d1e996df9',
            cardSetId: '7a031bf8-0e11-4339-aae0-167c7855a01a',
          },
        ],
        decks: [
          {
            id: 'fa3a51e4-8a61-4a4a-b2a6-404405b02ebe',
          },
        ],
      },
    },
  })
  data: {
    user: IUser;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
