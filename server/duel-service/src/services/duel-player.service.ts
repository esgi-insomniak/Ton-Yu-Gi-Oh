import { Injectable } from '@nestjs/common';
import { DuelPlayer } from 'src/entities/duelPlayer.entity';
import { DataSource, DeepPartial } from 'typeorm';

@Injectable()
export class DuelPlayerService {
  constructor(private readonly dataSource: DataSource) {}

  async getDuelPlayerById(id: string): Promise<DuelPlayer> {
    const duelPlayer = await this.dataSource.getRepository(DuelPlayer).findOne({
      where: { id },
    });
    return duelPlayer;
  }

  async createDuelPlayer(
    duelPlayerPartial: DeepPartial<DuelPlayer>,
  ): Promise<DuelPlayer> {
    try {
      const newDuelPlayer = await this.dataSource
        .getRepository(DuelPlayer)
        .save(duelPlayerPartial);
      return this.getDuelPlayerById(newDuelPlayer.id);
    } catch {
      return null;
    }
  }

  async updateDuelPlayerById(
    id: string,
    duelPlayer: DeepPartial<DuelPlayer>,
  ): Promise<DuelPlayer> {
    try {
      await this.dataSource.getRepository(DuelPlayer).update(id, duelPlayer);
      return await this.getDuelPlayerById(id);
    } catch {
      return null;
    }
  }

  async deleteDuelPlayerById(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(DuelPlayer)
      .delete({ id });
    return deleteResult.affected > 0;
  }
}
