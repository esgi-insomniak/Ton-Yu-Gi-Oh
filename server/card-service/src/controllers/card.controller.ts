import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ICardGetOneResponse,
  ICardGetResponse,
} from '../interfaces/card/card-response.interface';
import { CardService } from '../services/card.service';
import { DBFeederService } from 'src/services/dbFeeder.service';

@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly dbFeederService: DBFeederService,
  ) {}

  @MessagePattern('get_cards')
  public async getCards(query: {
    limit: number;
    offset: number;
  }): Promise<ICardGetResponse> {
    const cards = await this.cardService.getCards(query);
    const result: ICardGetResponse = {
      status: HttpStatus.OK,
      cards: cards,
    };

    return result;
  }

  @MessagePattern('get_card_by_id')
  public async getCardById(params: {
    id: string;
  }): Promise<ICardGetOneResponse> {
    const card = await this.cardService.getCardById(params.id);
    const result: ICardGetOneResponse = {
      status: card ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: card ? null : 'Card not found',
      card: card,
    };

    return result;
  }

  @MessagePattern('feed_database')
  public async feedDatabase(params: { chunk: number }): Promise<string> {
    return await this.dbFeederService.feedDatabase(params.chunk);
  }
}
