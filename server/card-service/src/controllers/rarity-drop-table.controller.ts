import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { RarityDropTable } from 'src/entities/rarityDropTable.entity';
import { RarityDropTableService } from 'src/services/rarity-drop-table.service';

@Controller('rarity_drop_table')
export class RarityDropTableController {
  constructor(
    private readonly rarityDropTableService: RarityDropTableService,
  ) {}

  @MessagePattern('get_rarity_drop_tables')
  public async getRarityDropTables(
    query: QueryGetItems,
  ): Promise<GetResponseArray<RarityDropTable>> {
    const rarityDropTables =
      await this.rarityDropTableService.getRarityDropTables(query);
    const result: GetResponseArray<RarityDropTable> = {
      status: HttpStatus.OK,
      items: rarityDropTables,
    };

    return result;
  }

  @MessagePattern('get_rarity_drop_table_by_id')
  public async getRarityDropTableById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<RarityDropTable>> {
    const rarityDropTable =
      await this.rarityDropTableService.getRarityDropTableById(params.id);
    const result: GetResponseOne<RarityDropTable> = {
      status: rarityDropTable ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: rarityDropTable ? null : 'Rarity not found',
      item: rarityDropTable,
    };

    return result;
  }
}
