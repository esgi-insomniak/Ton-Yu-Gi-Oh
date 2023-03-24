import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ICardGetOneResponse,
  ICardGetResponse,
} from '../interfaces/card/card-response.interface';
import { CardService } from '../services/card.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @MessagePattern('get_cards')
  public async getCards(query: {
    limit: number;
    offset: number;
  }): Promise<ICardGetResponse> {
    const cards = await this.cardService.getCards(query);

    return {
      cards: cards,
    };
  }

  @MessagePattern('get_card_by_id')
  public async getCardById(params: {
    id: string;
  }): Promise<ICardGetOneResponse> {
    const card = await this.cardService.getCardById(params.id);

    return {
      card: card,
    };
  }
}
