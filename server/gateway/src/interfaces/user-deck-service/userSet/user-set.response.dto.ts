import { ApiProperty } from '@nestjs/swagger';
import { IUserSet } from './user-set.interface';

export class GetUserSetsResponseDto {
  @ApiProperty({
    example: [
      {
        id: '3cc7f9b7-96aa-4b22-b1bc-07957d3d67ee',
        userId: 'cfd4195c-362b-4b37-b25d-3a35ecb88368',
        set: {
          id: '01b09ff6-d243-4663-af41-f038a9cd47e1',
          name: 'Breakers of Shadow',
          code: 'BOSH',
          image: 'https://images.ygoprodeck.com/images/sets/BOSH.jpg',
          cardSets: [
            {
              id: '67674391-8048-4f08-a1f2-0aa47c497b9b',
              card: '2b1f652c-5266-4bdc-93e1-847077087901',
              set: '01b09ff6-d243-4663-af41-f038a9cd47e1',
              price: 1.36,
            },
            {
              id: '75d6ac4c-0a11-444e-9ee2-60abd5644031',
              card: 'a9db6b73-6b1d-4871-8274-6fec8b552df6',
              set: '01b09ff6-d243-4663-af41-f038a9cd47e1',
              price: 1.05,
            },
          ],
        },
      },
    ],
  })
  data: IUserSet[];
}

export class GetUserSetByIdResponseDto {
  @ApiProperty({
    example: {
      id: '3cc7f9b7-96aa-4b22-b1bc-07957d3d67ee',
      userId: 'cfd4195c-362b-4b37-b25d-3a35ecb88368',
      set: {
        id: '01b09ff6-d243-4663-af41-f038a9cd47e1',
        name: 'Breakers of Shadow',
        code: 'BOSH',
        image: 'https://images.ygoprodeck.com/images/sets/BOSH.jpg',
        cardSets: [
          {
            id: '67674391-8048-4f08-a1f2-0aa47c497b9b',
            card: '2b1f652c-5266-4bdc-93e1-847077087901',
            set: '01b09ff6-d243-4663-af41-f038a9cd47e1',
            price: 1.36,
          },
          {
            id: '75d6ac4c-0a11-444e-9ee2-60abd5644031',
            card: 'a9db6b73-6b1d-4871-8274-6fec8b552df6',
            set: '01b09ff6-d243-4663-af41-f038a9cd47e1',
            price: 1.05,
          },
        ],
      },
    },
  })
  data: IUserSet;
}
