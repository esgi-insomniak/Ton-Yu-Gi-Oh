import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
} from '../interfaces/common/common.response.interface';
import { CardSet } from 'src/entities/cardSet.entity';
import { CardSetService } from 'src/services/card-set.service';
import { CardSetsQuery } from 'src/interfaces/common/common.query.interface';

@Controller('card_set')
export class CardSetController {
  constructor(private readonly cardSetService: CardSetService) {}

  @MessagePattern('get_cardsets')
  public async getCardSets(
    query: CardSetsQuery,
  ): Promise<GetResponseArray<CardSet>> {
    const cardSets = await this.cardSetService.getCardSets(query);
    const result: GetResponseArray<CardSet> = {
      status: HttpStatus.OK,
      items: cardSets,
    };

    return result;
  }

  @MessagePattern('get_cardset_by_id')
  public async getCardSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<CardSet>> {
    const cardSet = await this.cardSetService.getCardSetById(params.id);
    const result: GetResponseOne<CardSet> = {
      status: cardSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: cardSet ? null : 'CardSet not found',
      item: cardSet,
    };

    return result;
  }

  @MessagePattern('get_cardsets_by_ids')
  public async getCardSetsByIds(params: {
    ids: string[];
    query: CardSetsQuery | undefined;
  }): Promise<GetResponseArray<CardSet>> {
    const cardSets = await this.cardSetService.getCardSetsByIds(
      params.ids,
      params.query || ({} as CardSetsQuery),
    );
    const result: GetResponseArray<CardSet> = {
      status: cardSets ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: cardSets ? null : 'CardSets not found',
      items: cardSets,
    };

    return result;
  }
}
