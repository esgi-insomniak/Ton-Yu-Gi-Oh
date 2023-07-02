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
          cardSetsOnOpen: 9,
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
            id: '68767f42-099e-4fb0-aa30-b0c6b97f77f6',
            price: 2.61,
            card: {
              id: '236699b3-3b33-4089-8927-a05a10d66d0d',
              identifiant: 96851799,
              name: 'Âme Hinotama',
              enName: 'Hinotama Soul',
              description:
                "Créature incandescente qui détruit tout ce qu'elle trouve sur son passage.",
              atk: 600,
              def: 500,
              level: 2,
              scale: null,
              linkVal: null,
              imageUrl:
                'https://images.ygoprodeck.com/images/cards/96851799.jpg',
              imageUrlSmall:
                'https://images.ygoprodeck.com/images/cards_small/96851799.jpg',
              type: {
                id: '51937f55-fc7e-45f4-85e5-1fb2eea164a3',
                name: 'Normal Monster',
              },
              frameType: {
                id: 'a5f2f428-5968-4d21-a277-f74427ce5e3b',
                name: 'normal',
              },
              race: {
                id: '82d2365a-d5f9-4557-bcfa-923c92f247d3',
                name: 'Pyro',
              },
              archetype: null,
              attribute: {
                id: 'a3044c01-b98e-4115-ba9a-b9150d31955e',
                name: 'FIRE',
              },
              price: {
                id: '7506a6a5-951c-4d77-9371-6a4f3e2f0ccd',
                cardMarketPrice: 0.66,
                tcgPlayerPrice: 0.1,
                ebayPrice: 0.99,
                amazonPrice: 1.72,
                coolStuffIncPrice: 0.79,
              },
              linkMarkers: [],
            },
            rarity: {
              id: '0f877813-fb92-43a6-a07a-69aaf6b938cd',
              name: 'Common',
              code: 'C',
            },
          },
        ],
        cardSetsOnOpen: 9,
      },
    },
  })
  data: IUserSet;
}
