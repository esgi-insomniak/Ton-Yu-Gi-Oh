import { ApiProperty } from '@nestjs/swagger';
import { ICardCardSet } from './card-set.interface';

export class GetCardCardSetsResponseDto {
  @ApiProperty({
    example: [
      {
        id: '0010f4be-8f2d-4738-b064-fceae820d25b',
        card: {
          id: '30727523-aee6-4ed5-8541-554f75b75a7f',
          identifiant: 64599569,
          name: 'Chimeratech Over-Dragon',
          enName: 'Chimeratech Overdragon',
          description:
            '"Cyber Dragon" + 1+ monstre Machine\nUniquement Invocable par Fusion. Si cette carte est Invoquée par Fusion : envoyez toutes les autres cartes que vous contrôlez au Cimetière. L\'ATK/DEF d\'origine de cette carte deviennent chacune égales au nombre de Matériels Fusion utilisés pour son Invocation Fusion x 800. Chaque Battle Phase, cette carte peut attaquer les monstres de votre adversaire, un nombre de fois inférieur ou égal au nombre de Matériels Fusion utilisés pour son Invocation Fusion.',
          atk: 0,
          def: 0,
          level: 9,
          scale: null,
          linkVal: null,
          imageUrl: 'https://images.ygoprodeck.com/images/cards/64599569.jpg',
          imageUrlSmall:
            'https://images.ygoprodeck.com/images/cards_small/64599569.jpg',
        },
        set: {
          id: 'b02085e2-6ccd-4812-9e1b-b439322c916d',
          name: 'Structure Deck: Cyber Strike',
          code: 'SDCS',
          image: 'https://images.ygoprodeck.com/images/sets/SDCS.jpg',
        },
        price: 0.95,
        rarity: {
          id: '8a1c93f4-9eb3-4874-a6ba-391ebe25f170',
          name: 'Common',
          code: 'C',
        },
      },
    ],
  })
  data: ICardCardSet[];
}

export class GetCardCardSetByIdResponseDto {
  @ApiProperty({
    example: {
      id: '0010f4be-8f2d-4738-b064-fceae820d25b',
      card: {
        id: '30727523-aee6-4ed5-8541-554f75b75a7f',
        identifiant: 64599569,
        name: 'Chimeratech Over-Dragon',
        enName: 'Chimeratech Overdragon',
        description:
          '"Cyber Dragon" + 1+ monstre Machine\nUniquement Invocable par Fusion. Si cette carte est Invoquée par Fusion : envoyez toutes les autres cartes que vous contrôlez au Cimetière. L\'ATK/DEF d\'origine de cette carte deviennent chacune égales au nombre de Matériels Fusion utilisés pour son Invocation Fusion x 800. Chaque Battle Phase, cette carte peut attaquer les monstres de votre adversaire, un nombre de fois inférieur ou égal au nombre de Matériels Fusion utilisés pour son Invocation Fusion.',
        atk: 0,
        def: 0,
        level: 9,
        scale: null,
        linkVal: null,
        imageUrl: 'https://images.ygoprodeck.com/images/cards/64599569.jpg',
        imageUrlSmall:
          'https://images.ygoprodeck.com/images/cards_small/64599569.jpg',
      },
      set: {
        id: 'b02085e2-6ccd-4812-9e1b-b439322c916d',
        name: 'Structure Deck: Cyber Strike',
        code: 'SDCS',
        image: 'https://images.ygoprodeck.com/images/sets/SDCS.jpg',
      },
      price: 0.95,
      rarity: {
        id: '8a1c93f4-9eb3-4874-a6ba-391ebe25f170',
        name: 'Common',
        code: 'C',
      },
    },
  })
  data: ICardCardSet;
}
