import { ApiProperty } from '@nestjs/swagger';
import { ICardPrice } from './price.interface';

export class GetCardPricesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '0037d94f-91fd-4e04-b081-76da22069075',
        card: {
          id: 'cf6a793f-a775-4a4d-b974-f4ab17de87d4',
          identifiant: 99177923,
          name: 'Archdémon Enfernité',
          enName: 'Infernity Archfiend',
          description:
            'Lorsque vous piochez cette carte, si vous n\'avez aucune autre carte dans votre main : vous pouvez révéler cette carte ; Invoquez Spécialement cette carte depuis votre main. Lorsque cette carte est Invoquée Spécialement : vous pouvez ajouter 1 carte "Enfernité" depuis votre Deck à votre main. Vous ne devez avoir aucune carte dans votre main pour activer et résoudre cet effet.',
          atk: 1800,
          def: 1200,
          level: 4,
          scale: null,
          linkVal: null,
          imageUrl: 'https://images.ygoprodeck.com/images/cards/99177923.jpg',
          imageUrlSmall:
            'https://images.ygoprodeck.com/images/cards_small/99177923.jpg',
        },
        cardMarketPrice: 0.36,
        tcgPlayerPrice: 2.07,
        ebayPrice: 0.99,
        amazonPrice: 3.77,
        coolStuffIncPrice: 1.99,
      },
    ],
  })
  data: ICardPrice[];
}

export class GetCardPriceByIdResponseDto {
  @ApiProperty({
    example: {
      id: '0037d94f-91fd-4e04-b081-76da22069075',
      card: {
        id: 'cf6a793f-a775-4a4d-b974-f4ab17de87d4',
        identifiant: 99177923,
        name: 'Archdémon Enfernité',
        enName: 'Infernity Archfiend',
        description:
          'Lorsque vous piochez cette carte, si vous n\'avez aucune autre carte dans votre main : vous pouvez révéler cette carte ; Invoquez Spécialement cette carte depuis votre main. Lorsque cette carte est Invoquée Spécialement : vous pouvez ajouter 1 carte "Enfernité" depuis votre Deck à votre main. Vous ne devez avoir aucune carte dans votre main pour activer et résoudre cet effet.',
        atk: 1800,
        def: 1200,
        level: 4,
        scale: null,
        linkVal: null,
        imageUrl: 'https://images.ygoprodeck.com/images/cards/99177923.jpg',
        imageUrlSmall:
          'https://images.ygoprodeck.com/images/cards_small/99177923.jpg',
      },
      cardMarketPrice: 0.36,
      tcgPlayerPrice: 2.07,
      ebayPrice: 0.99,
      amazonPrice: 3.77,
      coolStuffIncPrice: 1.99,
    },
  })
  data: ICardPrice;
}
