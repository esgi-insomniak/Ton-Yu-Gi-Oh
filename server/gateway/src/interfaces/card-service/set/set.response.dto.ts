import { ApiProperty } from '@nestjs/swagger';
import { ICardSet } from './set.interface';

export class GetCardSetsResponseDto {
  @ApiProperty({
    example: [
      {
        id: '024b12d6-b85b-4639-84e1-93eb9d18b565',
        name: 'The Lost Art Promotion K',
        code: 'LART',
        image: 'https://images.ygoprodeck.com/images/sets/LART.jpg',
        cardSetsOnOpen: 9,
      },
    ],
  })
  data: ICardSet[];
}

export class GetCardSetByIdResponseDto {
  @ApiProperty({
    example: {
      id: '024b12d6-b85b-4639-84e1-93eb9d18b565',
      name: 'The Lost Art Promotion K',
      code: 'LART',
      image: 'https://images.ygoprodeck.com/images/sets/LART.jpg',
      cardSets: [
        {
          id: '971f532e-4860-46f2-9964-7b55788945db',
          price: 0.94,
          card: {
            id: '0d5eca3c-432c-4a31-93fd-4fc88db08c84',
            identifiant: 37478723,
            name: '"Armes Nobles Inferno - Durendal"',
            enName: '"Infernoble Arms - Durendal"',
            description:
              'Tant que cette carte est équipée à un monstre : vous pouvez ajouter 1 monstre FEU Guerrier de max. Niveau 5 depuis votre Deck à votre main, puis détruisez cette carte. Si cette carte est envoyée au Cimetière parce que le monstre équipé est envoyé au Cimetière : vous pouvez cibler 1 monstre FEU Guerrier de max. Niveau 5 dans votre Cimetière ; Invoquez-le Spécialement, et aussi, vous ne pouvez pas Invoquer Spécialement de monstres (monstres Guerrier exclus) le reste du tour. Vous ne pouvez utiliser qu\'1 effet de ""Armes Nobles Inferno - Durendal"" par tour, et uniquement une fois le tour.',
            atk: null,
            def: null,
            level: null,
            scale: null,
            linkVal: null,
            imageUrl: 'https://images.ygoprodeck.com/images/cards/37478723.jpg',
            imageUrlSmall:
              'https://images.ygoprodeck.com/images/cards_small/37478723.jpg',
            type: {
              id: 'ed1f516c-2ba2-4111-a7bd-205222556a29',
              name: 'Spell Card',
            },
            frameType: {
              id: '92328241-e02c-4fa0-af93-7fc9940cfc08',
              name: 'spell',
            },
            race: {
              id: 'f2ac7bd4-0366-4ec0-aa3d-0de22dd3c5d2',
              name: 'Equip',
            },
            archetype: {
              id: 'eec7aaf1-e1a6-47c8-a352-60934327d6ea',
              name: 'Noble Knight',
            },
            attribute: null,
            price: {
              id: '28a55e02-094d-4a23-9f6a-459dbfc0549d',
              cardMarketPrice: 0.1,
              tcgPlayerPrice: 0.08,
              ebayPrice: 0.99,
              amazonPrice: 2.96,
              coolStuffIncPrice: 0,
            },
            linkMarkers: [],
          },
        },
      ],
      cardSetsOnOpen: 9,
    },
  })
  data: ICardSet;
}
