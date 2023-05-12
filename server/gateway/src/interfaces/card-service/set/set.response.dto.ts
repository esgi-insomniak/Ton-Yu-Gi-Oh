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
          },
        },
      ],
    },
  })
  data: ICardSet;
}
