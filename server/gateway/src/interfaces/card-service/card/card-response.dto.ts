import { ApiProperty } from '@nestjs/swagger';
import { ICard } from './card.interface';

export class GetCardsResponseDto {
  @ApiProperty({
    example: {
      cards: [
        {
          id: '52264803-0e95-4591-931c-5d8fde6d2f4f',
          identifiant: 37478723,
          name: '"Armes Nobles Inferno - Durendal"',
          enName: '"Infernoble Arms - Durendal"',
          description:
            'Tant que cette carte est \u00e9quip\u00e9e \u00e0 un monstre : vous pouvez ajouter 1 monstre FEU Guerrier de max. Niveau 5 depuis votre Deck \u00e0 votre main, puis d\u00e9truisez cette carte. Si cette carte est envoy\u00e9e au Cimeti\u00e8re parce que le monstre \u00e9quip\u00e9 est envoy\u00e9 au Cimeti\u00e8re : vous pouvez cibler 1 monstre FEU Guerrier de max. Niveau 5 dans votre Cimeti\u00e8re ; Invoquez-le Sp\u00e9cialement, et aussi, vous ne pouvez pas Invoquer Sp\u00e9cialement de monstres (monstres Guerrier exclus) le reste du tour. Vous ne pouvez utiliser qu\'1 effet de "Armes Nobles Inferno - Durendal" par tour, et uniquement une fois le tour.',
          atk: null,
          def: null,
          level: null,
          scale: null,
          linkVal: null,
          imageUrl: 'https://images.ygoprodeck.com/images/cards/37478723.jpg',
          imageUrlSmall:
            'https://images.ygoprodeck.com/images/cards_small/37478723.jpg',
          type: {
            id: '613b9c73-213b-4d18-bff2-a3a7f735053c',
            name: 'Spell Card',
          },
          frameType: {
            id: '3266db93-050c-40ae-a05e-2b4051f6758c',
            name: 'spell',
          },
          race: {
            id: 'f1f52d17-35d3-434f-9d59-64f6b4519ffa',
            name: 'Equip',
          },
          archetype: {
            id: 'e1473f22-c69c-49d5-88b0-97c79c3203c4',
            name: 'Noble Knight',
          },
          attribute: null,
          price: {
            id: '2941f746-6c99-4f1f-a2cb-8cab042c209b',
            cardMarketPrice: 0.09,
            tcgPlayerPrice: 0.07,
            ebayPrice: 0.99,
            amazonPrice: 2.96,
            coolStuffIncPrice: 0,
          },
          cardSets: [
            {
              id: '563a3220-f614-422f-b441-1c92649cde0a',
              price: 0.94,
            },
            {
              id: 'ba8aa05a-bf8d-4d1d-9d7c-eaf36c47a73e',
              price: 0,
            },
            {
              id: 'ac752081-4105-48f5-a1d3-3110a5bf1e5e',
              price: 5.35,
            },
          ],
          linkMarkers: [],
        },
      ],
    },
  })
  data: {
    cards: ICard[];
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}

export class GetCardByIdResponseDto {
  @ApiProperty({
    example: {
      card: {
        id: '52264803-0e95-4591-931c-5d8fde6d2f4f',
        identifiant: 37478723,
        name: '"Armes Nobles Inferno - Durendal"',
        enName: '"Infernoble Arms - Durendal"',
        description:
          'Tant que cette carte est \u00e9quip\u00e9e \u00e0 un monstre : vous pouvez ajouter 1 monstre FEU Guerrier de max. Niveau 5 depuis votre Deck \u00e0 votre main, puis d\u00e9truisez cette carte. Si cette carte est envoy\u00e9e au Cimeti\u00e8re parce que le monstre \u00e9quip\u00e9 est envoy\u00e9 au Cimeti\u00e8re : vous pouvez cibler 1 monstre FEU Guerrier de max. Niveau 5 dans votre Cimeti\u00e8re ; Invoquez-le Sp\u00e9cialement, et aussi, vous ne pouvez pas Invoquer Sp\u00e9cialement de monstres (monstres Guerrier exclus) le reste du tour. Vous ne pouvez utiliser qu\'1 effet de "Armes Nobles Inferno - Durendal" par tour, et uniquement une fois le tour.',
        atk: null,
        def: null,
        level: null,
        scale: null,
        linkVal: null,
        imageUrl: 'https://images.ygoprodeck.com/images/cards/37478723.jpg',
        imageUrlSmall:
          'https://images.ygoprodeck.com/images/cards_small/37478723.jpg',
        type: {
          id: '613b9c73-213b-4d18-bff2-a3a7f735053c',
          name: 'Spell Card',
        },
        frameType: {
          id: '3266db93-050c-40ae-a05e-2b4051f6758c',
          name: 'spell',
        },
        race: {
          id: 'f1f52d17-35d3-434f-9d59-64f6b4519ffa',
          name: 'Equip',
        },
        archetype: {
          id: 'e1473f22-c69c-49d5-88b0-97c79c3203c4',
          name: 'Noble Knight',
        },
        attribute: null,
        price: {
          id: '2941f746-6c99-4f1f-a2cb-8cab042c209b',
          cardMarketPrice: 0.09,
          tcgPlayerPrice: 0.07,
          ebayPrice: 0.99,
          amazonPrice: 2.96,
          coolStuffIncPrice: 0,
        },
        cardSets: [
          {
            id: '563a3220-f614-422f-b441-1c92649cde0a',
            price: 0.94,
          },
          {
            id: 'ba8aa05a-bf8d-4d1d-9d7c-eaf36c47a73e',
            price: 0,
          },
          {
            id: 'ac752081-4105-48f5-a1d3-3110a5bf1e5e',
            price: 5.35,
          },
        ],
        linkMarkers: [],
      },
    },
  })
  data: {
    card: ICard;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
