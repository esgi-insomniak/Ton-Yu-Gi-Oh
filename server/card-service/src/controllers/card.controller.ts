import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { CardService } from '../services/card.service';
import { Card } from 'src/entities/card.entity';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @MessagePattern('get_cards')
  public async getCards(query: QueryGetItems): Promise<GetResponseArray<Card>> {
    const cards = await this.cardService.getCards(query);
    const result: GetResponseArray<Card> = {
      status: HttpStatus.OK,
      items: cards,
    };

    return result;
  }

  @MessagePattern('get_card_by_id')
  public async getCardById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Card>> {
    const card = await this.cardService.getCardById(params.id);
    const result: GetResponseOne<Card> = {
      status: card ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: card ? null : 'Card not found',
      item: card,
    };

    return result;
  }
}
