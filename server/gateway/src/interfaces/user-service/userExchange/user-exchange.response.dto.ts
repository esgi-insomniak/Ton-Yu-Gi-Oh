import { ApiProperty } from '@nestjs/swagger';
import { IUserExchange } from './user-exchange.interface';

export class GetUserExchangesResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'f1528601-3f4f-4bf6-8da9-350fd620c4f6',
        ownerAccepted: false,
        targetAccepted: false,
        isClosed: false,
        ownerCoinsProposed: 0,
        targetCoinsProposed: 0,
        ownerCardSetsProposed: [
          {
            id: 'ec18310b-be32-4cc4-abc8-b534470dcd42',
            userId: 'c1e183bf-8677-4b0b-8677-4f11eb2cc099',
            cardSet: {
              id: 'a024fcaa-89fb-491e-904e-e8f6e27c5909',
              price: 1.43,
              card: {
                id: '760d59da-9c9b-40c7-81b8-9c6992aae87f',
                identifiant: 51482758,
                name: 'Piège Supprimé',
                enName: 'Remove Trap',
                description: 'Détruit 1 Carte Piège face recto sur le Terrain.',
                atk: null,
                def: null,
                level: null,
                scale: null,
                linkVal: null,
                imageUrl:
                  'https://images.ygoprodeck.com/images/cards/51482758.jpg',
                imageUrlSmall:
                  'https://images.ygoprodeck.com/images/cards_small/51482758.jpg',
                type: {
                  id: 'b655a89d-897b-4fbf-bfea-3a9914270c6e',
                  name: 'Spell Card',
                },
                frameType: {
                  id: '336a17d9-d3bb-41f8-b546-935806b19bc7',
                  name: 'spell',
                },
                race: {
                  id: '2fe27bd7-b70f-4279-a1f8-e60d69001dbd',
                  name: 'Normal',
                },
                archetype: null,
                attribute: null,
                price: {
                  id: '6d557437-0377-473a-83b7-4d898da6180d',
                  cardMarketPrice: 0.14,
                  tcgPlayerPrice: 0.13,
                  ebayPrice: 0.99,
                  amazonPrice: 2.43,
                  coolStuffIncPrice: 0.49,
                },
                linkMarkers: [],
              },
              set: {
                id: '386f9af0-a3e9-4619-bd28-91d4cdac454f',
                cardSetsOnOpen: 9,
                name: 'Legend of Blue Eyes White Dragon',
                code: 'LOB',
                image: 'https://images.ygoprodeck.com/images/sets/LOB.jpg',
              },
              rarity: {
                id: 'f95b8817-1171-4141-89dc-e8071b094a63',
                name: 'Common',
                code: 'C',
              },
            },
          },
        ],
        targetCardSetsProposed: [
          {
            id: 'a4048113-17f5-4c1a-bd49-17ce49e894a4',
            userId: 'a5e1629b-86e0-445a-97bc-d752f1027330',
            cardSet: {
              id: 'ac4051c8-7f5c-4d1b-8d5d-0d1166a2f950',
              price: 1.68,
              card: {
                id: 'b0c7d64f-1e20-4be9-a1d3-890b607f6ade',
                identifiant: 84686841,
                name: 'Roi Brume',
                enName: 'King Fog',
                description: 'Démon qui vit dans un écran aveuglant de fumée.',
                atk: 1000,
                def: 900,
                level: 3,
                scale: null,
                linkVal: null,
                imageUrl:
                  'https://images.ygoprodeck.com/images/cards/84686841.jpg',
                imageUrlSmall:
                  'https://images.ygoprodeck.com/images/cards_small/84686841.jpg',
                type: {
                  id: 'a2f41585-231a-464b-9093-bc5c489493a1',
                  name: 'Normal Monster',
                },
                frameType: {
                  id: '36aac822-775e-4331-8026-45cd6232509a',
                  name: 'normal',
                },
                race: {
                  id: '9ddcaa45-aeb6-48ce-ae20-dddc2d631f21',
                  name: 'Fiend',
                },
                archetype: null,
                attribute: {
                  id: 'e2dab309-80df-435b-8838-fdb75f58e4db',
                  name: 'DARK',
                },
                price: {
                  id: 'd6f95516-49f4-4bea-9635-19b9fb350b6d',
                  cardMarketPrice: 1.48,
                  tcgPlayerPrice: 0.1,
                  ebayPrice: 5.59,
                  amazonPrice: 24.99,
                  coolStuffIncPrice: 0.39,
                },
                linkMarkers: [],
              },
              set: {
                id: '386f9af0-a3e9-4619-bd28-91d4cdac454f',
                cardSetsOnOpen: 9,
                name: 'Legend of Blue Eyes White Dragon',
                code: 'LOB',
                image: 'https://images.ygoprodeck.com/images/sets/LOB.jpg',
              },
              rarity: {
                id: 'f95b8817-1171-4141-89dc-e8071b094a63',
                name: 'Common',
                code: 'C',
              },
            },
          },
        ],
        exchangeOwner: {
          id: 'c1e183bf-8677-4b0b-8677-4f11eb2cc099',
          username: 'JohnDoe',
          email: 'johndoe@test.fr',
          phone: null,
          roles: ['user'],
          coins: 3367,
          isOnline: true,
          profilePicture: {
            id: 'a9012312-5ae9-4204-aa09-96fc13caa045',
            name: 'YuGi',
            path: 'yugi.png',
          },
        },
        exchangeTarget: {
          id: 'a5e1629b-86e0-445a-97bc-d752f1027330',
          username: 'Loan',
          email: 'loan@test.fr',
          phone: null,
          roles: ['user'],
          coins: 0,
          isOnline: true,
          profilePicture: null,
        },
      },
    ],
  })
  data: IUserExchange[];
}

export class GetUserExchangeByIdResponseDto {
  @ApiProperty({
    example: {
      id: 'f1528601-3f4f-4bf6-8da9-350fd620c4f6',
      ownerAccepted: false,
      targetAccepted: false,
      isClosed: false,
      ownerCoinsProposed: 0,
      targetCoinsProposed: 0,
      ownerCardSetsProposed: [
        {
          id: 'ec18310b-be32-4cc4-abc8-b534470dcd42',
          userId: 'c1e183bf-8677-4b0b-8677-4f11eb2cc099',
          cardSet: {
            id: 'a024fcaa-89fb-491e-904e-e8f6e27c5909',
            price: 1.43,
            card: {
              id: '760d59da-9c9b-40c7-81b8-9c6992aae87f',
              identifiant: 51482758,
              name: 'Piège Supprimé',
              enName: 'Remove Trap',
              description: 'Détruit 1 Carte Piège face recto sur le Terrain.',
              atk: null,
              def: null,
              level: null,
              scale: null,
              linkVal: null,
              imageUrl:
                'https://images.ygoprodeck.com/images/cards/51482758.jpg',
              imageUrlSmall:
                'https://images.ygoprodeck.com/images/cards_small/51482758.jpg',
              type: {
                id: 'b655a89d-897b-4fbf-bfea-3a9914270c6e',
                name: 'Spell Card',
              },
              frameType: {
                id: '336a17d9-d3bb-41f8-b546-935806b19bc7',
                name: 'spell',
              },
              race: {
                id: '2fe27bd7-b70f-4279-a1f8-e60d69001dbd',
                name: 'Normal',
              },
              archetype: null,
              attribute: null,
              price: {
                id: '6d557437-0377-473a-83b7-4d898da6180d',
                cardMarketPrice: 0.14,
                tcgPlayerPrice: 0.13,
                ebayPrice: 0.99,
                amazonPrice: 2.43,
                coolStuffIncPrice: 0.49,
              },
              linkMarkers: [],
            },
            set: {
              id: '386f9af0-a3e9-4619-bd28-91d4cdac454f',
              cardSetsOnOpen: 9,
              name: 'Legend of Blue Eyes White Dragon',
              code: 'LOB',
              image: 'https://images.ygoprodeck.com/images/sets/LOB.jpg',
            },
            rarity: {
              id: 'f95b8817-1171-4141-89dc-e8071b094a63',
              name: 'Common',
              code: 'C',
            },
          },
        },
      ],
      targetCardSetsProposed: [
        {
          id: 'a4048113-17f5-4c1a-bd49-17ce49e894a4',
          userId: 'a5e1629b-86e0-445a-97bc-d752f1027330',
          cardSet: {
            id: 'ac4051c8-7f5c-4d1b-8d5d-0d1166a2f950',
            price: 1.68,
            card: {
              id: 'b0c7d64f-1e20-4be9-a1d3-890b607f6ade',
              identifiant: 84686841,
              name: 'Roi Brume',
              enName: 'King Fog',
              description: 'Démon qui vit dans un écran aveuglant de fumée.',
              atk: 1000,
              def: 900,
              level: 3,
              scale: null,
              linkVal: null,
              imageUrl:
                'https://images.ygoprodeck.com/images/cards/84686841.jpg',
              imageUrlSmall:
                'https://images.ygoprodeck.com/images/cards_small/84686841.jpg',
              type: {
                id: 'a2f41585-231a-464b-9093-bc5c489493a1',
                name: 'Normal Monster',
              },
              frameType: {
                id: '36aac822-775e-4331-8026-45cd6232509a',
                name: 'normal',
              },
              race: {
                id: '9ddcaa45-aeb6-48ce-ae20-dddc2d631f21',
                name: 'Fiend',
              },
              archetype: null,
              attribute: {
                id: 'e2dab309-80df-435b-8838-fdb75f58e4db',
                name: 'DARK',
              },
              price: {
                id: 'd6f95516-49f4-4bea-9635-19b9fb350b6d',
                cardMarketPrice: 1.48,
                tcgPlayerPrice: 0.1,
                ebayPrice: 5.59,
                amazonPrice: 24.99,
                coolStuffIncPrice: 0.39,
              },
              linkMarkers: [],
            },
            set: {
              id: '386f9af0-a3e9-4619-bd28-91d4cdac454f',
              cardSetsOnOpen: 9,
              name: 'Legend of Blue Eyes White Dragon',
              code: 'LOB',
              image: 'https://images.ygoprodeck.com/images/sets/LOB.jpg',
            },
            rarity: {
              id: 'f95b8817-1171-4141-89dc-e8071b094a63',
              name: 'Common',
              code: 'C',
            },
          },
        },
      ],
      exchangeOwner: {
        id: 'c1e183bf-8677-4b0b-8677-4f11eb2cc099',
        username: 'JohnDoe',
        email: 'johndoe@test.fr',
        phone: null,
        roles: ['user'],
        coins: 3367,
        isOnline: true,
        profilePicture: {
          id: 'a9012312-5ae9-4204-aa09-96fc13caa045',
          name: 'YuGi',
          path: 'yugi.png',
        },
      },
      exchangeTarget: {
        id: 'a5e1629b-86e0-445a-97bc-d752f1027330',
        username: 'Loan',
        email: 'loan@test.fr',
        phone: null,
        roles: ['user'],
        coins: 0,
        isOnline: true,
        profilePicture: null,
      },
    },
  })
  data: IUserExchange;
}
