import { ApiProperty } from '@nestjs/swagger';
import { IUserCardSet } from './user-card-set.interface';

export class GetUserCardSetsResponseDto {
  @ApiProperty({
    example: [
      {
        id: '03a54917-a491-462c-b1b0-0730ddbad892',
        userId: 'cfd4195c-362b-4b37-b25d-3a35ecb88368',
        cardSet: {
          id: '0016b72a-1104-4cd3-a57a-efd51763cbb7',
          card: {
            id: 'dc8c93e6-4720-407d-a032-41bce589423d',
            identifiant: 97077563,
            name: "Appel de l'Être Hanté",
            enName: 'Call of the Haunted',
            description:
              "Activez cette carte en ciblant 1 monstre dans votre Cimetière ; Invoquez Spécialement la cible en Position d'Attaque. Lorsque cette carte quitte le Terrain, détruisez le monstre. Lorsque le monstre est détruit, détruisez cette carte.",
            atk: null,
            def: null,
            level: null,
            scale: null,
            linkVal: null,
            imageUrl: 'https://images.ygoprodeck.com/images/cards/97077563.jpg',
            imageUrlSmall:
              'https://images.ygoprodeck.com/images/cards_small/97077563.jpg',
          },
          set: {
            id: '202ce8f0-2ab1-42ee-a99c-1430628d1eaa',
            name: 'The Lost Art Promotion I',
            code: 'LART',
            image: 'https://images.ygoprodeck.com/images/sets/LART.jpg',
            cardSetsOnOpen: 9,
          },
          price: 15.06,
          rarity: {
            id: '8c45f7e2-f8de-4e50-a4f7-51c9e72166b5',
            name: 'Ultra Rare',
            code: 'UR',
          },
        },
      },
    ],
  })
  data: IUserCardSet[];
}

export class GetUserCardSetByIdResponseDto {
  @ApiProperty({
    example: {
      id: '03a54917-a491-462c-b1b0-0730ddbad892',
      userId: 'cfd4195c-362b-4b37-b25d-3a35ecb88368',
      cardSet: {
        id: '0016b72a-1104-4cd3-a57a-efd51763cbb7',
        card: {
          id: 'dc8c93e6-4720-407d-a032-41bce589423d',
          identifiant: 97077563,
          name: "Appel de l'Être Hanté",
          enName: 'Call of the Haunted',
          description:
            "Activez cette carte en ciblant 1 monstre dans votre Cimetière ; Invoquez Spécialement la cible en Position d'Attaque. Lorsque cette carte quitte le Terrain, détruisez le monstre. Lorsque le monstre est détruit, détruisez cette carte.",
          atk: null,
          def: null,
          level: null,
          scale: null,
          linkVal: null,
          imageUrl: 'https://images.ygoprodeck.com/images/cards/97077563.jpg',
          imageUrlSmall:
            'https://images.ygoprodeck.com/images/cards_small/97077563.jpg',
        },
        set: {
          id: '202ce8f0-2ab1-42ee-a99c-1430628d1eaa',
          name: 'The Lost Art Promotion I',
          code: 'LART',
          image: 'https://images.ygoprodeck.com/images/sets/LART.jpg',
          cardSetsOnOpen: 9,
        },
        price: 15.06,
        rarity: {
          id: '8c45f7e2-f8de-4e50-a4f7-51c9e72166b5',
          name: 'Ultra Rare',
          code: 'UR',
        },
      },
    },
  })
  data: IUserCardSet;
}

export class ScrapUserCardSetByIdResponseDto {
  @ApiProperty({
    example: {
      coinsEarned: 5,
    },
  })
  data: {
    coinsEarned: number;
  };
}
