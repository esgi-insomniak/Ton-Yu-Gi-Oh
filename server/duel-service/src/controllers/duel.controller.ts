import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DuelService } from '../services/duel.service';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { Duel } from 'src/entities/duel.entity';
import { DeepPartial } from 'typeorm';

@Controller('duel')
export class DuelController {
  constructor(private readonly duelService: DuelService) {}

  @MessagePattern('get_duel_by_room_id')
  public async getDuelByRoomId(params: {
    roomId: string;
  }): Promise<GetResponseOne<Duel>> {
    const duel = await this.duelService.getDuelByRoomId(params.roomId);
    const result: GetResponseOne<Duel> = {
      status: duel ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: duel ? null : 'Duel not found',
      item: duel,
    };

    return result;
  }

  @MessagePattern('get_duel_by_user_id')
  public async getDuelByUserId(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Duel>> {
    const duel = await this.duelService.getDuelByUserId(params.id);
    const result: GetResponseOne<Duel> = {
      status: duel ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: duel ? null : 'Duel not found',
      item: duel,
    };

    return result;
  }

  @MessagePattern('get_duel_by_id')
  public async getDuelById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Duel>> {
    const duel = await this.duelService.getDuelById(params.id);
    const result: GetResponseOne<Duel> = {
      status: duel ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: duel ? null : 'Duel not found',
      item: duel,
    };

    return result;
  }

  @MessagePattern('create_duel')
  public async createDuel(
    duel: DeepPartial<Duel>,
  ): Promise<GetResponseOne<Duel>> {
    const newDuel = await this.duelService.createDuel(duel);
    const result: GetResponseOne<Duel> = {
      status: newDuel ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: newDuel ? null : 'Duel not created',
      item: newDuel,
    };

    return result;
  }

  @MessagePattern('update_duel_by_room_id')
  public async updateDuelByRoomId(request: {
    params: { roomId: string };
    body: Duel;
  }): Promise<GetResponseOne<Duel>> {
    const duel = await this.duelService.updateDuelByRoomId(
      request.params.roomId,
      request.body,
    );
    const result: GetResponseOne<Duel> = {
      status: duel ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: duel ? null : 'Duel not updated',
      item: duel,
    };

    return result;
  }

  @MessagePattern('delete_duel_by_room_id')
  public async deleteDuelByRoomId(params: {
    roomId: string;
  }): Promise<GetResponseOne<boolean>> {
    const duelDeleted = await this.duelService.deleteDuelByRoomId(
      params.roomId,
    );
    const result: GetResponseOne<boolean> = {
      status: duelDeleted ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: duelDeleted ? null : 'Duel not deleted',
      item: duelDeleted,
    };

    return result;
  }
}
