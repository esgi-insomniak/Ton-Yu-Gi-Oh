import { Injectable } from '@nestjs/common';
import { Duel } from 'src/entities/duel.entity';
import { DuelPlayer } from 'src/entities/duelPlayer.entity';
import { DataSource, DeepPartial, In } from 'typeorm';

@Injectable()
export class DuelService {
  constructor(private readonly dataSource: DataSource) {}

  async getDuelById(id: string): Promise<Duel> {
    const duel = await this.dataSource.getRepository(Duel).findOne({
      where: { id },
      relations: ['players'],
    });
    return duel;
  }

  async getDuelByRoomId(roomId: string): Promise<Duel> {
    const duel = await this.dataSource.getRepository(Duel).findOne({
      where: { roomId },
      relations: ['players'],
    });
    return duel;
  }

  async getDuelByUserId(userId: string): Promise<Duel> {
    const duel = await this.dataSource.getRepository(Duel).findOne({
      where: { players: { userId } },
    });
    if (!duel) return null;
    return this.getDuelById(duel.id);
  }

  async createDuel(duelPartial: DeepPartial<Duel>): Promise<Duel> {
    try {
      const newDuel = await this.dataSource
        .getRepository(Duel)
        .save(duelPartial);
      return this.getDuelById(newDuel.id);
    } catch {
      return null;
    }
  }

  async updateDuelByRoomId(
    roomId: string,
    duel: DeepPartial<Duel>,
  ): Promise<Duel> {
    try {
      duel.players.forEach(async (player) => {
        await this.dataSource
          .getRepository(DuelPlayer)
          .update({ id: player.id }, player);
      });
      delete duel.players;
      await this.dataSource.getRepository(Duel).update({ roomId }, duel);
      return await this.getDuelByRoomId(roomId);
    } catch {
      return null;
    }
  }

  async deleteDuelByRoomId(roomId: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(Duel)
      .delete({ roomId });
    return deleteResult.affected > 0;
  }
}
