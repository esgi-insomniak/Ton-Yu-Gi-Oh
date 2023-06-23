import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DuelPlayer } from 'src/entities/duelPlayer.entity';
import { DuelPlayerService } from 'src/services/duel-player.service';
import { DeepPartial } from 'typeorm';

@Controller('duel_player')
export class DuelPlayerController {
  constructor(private readonly duelPlayerService: DuelPlayerService) {}

  @MessagePattern('get_duel_player_by_id')
  public async getDuelPlayerById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<DuelPlayer>> {
    const duelPlayer = await this.duelPlayerService.getDuelPlayerById(
      params.id,
    );
    const result: GetResponseOne<DuelPlayer> = {
      status: duelPlayer ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: duelPlayer ? null : 'DuelPlayer not found',
      item: duelPlayer,
    };

    return result;
  }

  @MessagePattern('create_duel_player')
  public async updateDuelPlayerById(
    duelPlayer: DeepPartial<DuelPlayer>,
  ): Promise<GetResponseOne<DuelPlayer>> {
    const newDuelPlayer = await this.duelPlayerService.createDuelPlayer(
      duelPlayer,
    );
    const result: GetResponseOne<DuelPlayer> = {
      status: newDuelPlayer ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: newDuelPlayer ? null : 'DuelPlayer not created',
      item: newDuelPlayer,
    };

    return result;
  }

  @MessagePattern('update_duel_player_by_id')
  public async updateDuelPlayerByRoomId(
    params: ParamGetItemById,
    body: DuelPlayer,
  ): Promise<GetResponseOne<DuelPlayer>> {
    const updatedDuelPlayer = await this.duelPlayerService.updateDuelPlayerById(
      params.id,
      body,
    );
    const result: GetResponseOne<DuelPlayer> = {
      status: updatedDuelPlayer ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: updatedDuelPlayer ? null : 'DuelPlayer not updated',
      item: updatedDuelPlayer,
    };

    return result;
  }

  @MessagePattern('delete_duel_player_by_id')
  public async deleteDuelPlayerById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<boolean>> {
    const deletedDuelPlayer = await this.duelPlayerService.deleteDuelPlayerById(
      params.id,
    );
    const result: GetResponseOne<boolean> = {
      status: deletedDuelPlayer ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: deletedDuelPlayer ? null : 'DuelPlayer not deleted',
      item: deletedDuelPlayer,
    };

    return result;
  }
}
