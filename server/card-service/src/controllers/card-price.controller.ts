import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Price } from 'src/entities/price.entity';
import { CardPriceService } from 'src/services/card-price.service';

@Controller('card_price')
export class CardPriceController {
  constructor(private readonly cardPriceService: CardPriceService) {}

  @MessagePattern('get_prices')
  public async getPrices(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Price>> {
    const prices = await this.cardPriceService.getPrices(query);
    const result: GetResponseArray<Price> = {
      status: HttpStatus.OK,
      items: prices,
    };

    return result;
  }

  @MessagePattern('get_price_by_id')
  public async getPriceById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Price>> {
    const price = await this.cardPriceService.getPriceById(params.id);
    const result: GetResponseOne<Price> = {
      status: price ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: price ? null : 'Price not found',
      item: price,
    };

    return result;
  }
}
