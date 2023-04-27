import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Rarity } from 'src/entities/rarity.entity';
import { RarityService } from 'src/services/rarity.service';

@Controller('rarity')
export class RarityController {
  constructor(private readonly rarityService: RarityService) {}

  @MessagePattern('get_rarities')
  public async getRarities(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Rarity>> {
    const rarities = await this.rarityService.getRarities(query);
    const result: GetResponseArray<Rarity> = {
      status: HttpStatus.OK,
      items: rarities,
    };

    return result;
  }

  @MessagePattern('get_rarity_by_id')
  public async getRarityById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Rarity>> {
    const rarity = await this.rarityService.getRarityById(params.id);
    const result: GetResponseOne<Rarity> = {
      status: rarity ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: rarity ? null : 'Rarity not found',
      item: rarity,
    };

    return result;
  }
}
