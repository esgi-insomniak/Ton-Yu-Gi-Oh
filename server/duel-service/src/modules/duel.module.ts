import { Module } from '@nestjs/common';
import { DuelController } from '../controllers/duel.controller';
import { DuelService } from '../services/duel.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from '../modules/postgres.module';
import { DuelPlayerService } from 'src/services/duel-player.service';
import { DuelPlayerController } from 'src/controllers/duel-player.controller';

@Module({
  imports: [PostgresModule],
  controllers: [DuelController, DuelPlayerController],
  providers: [DuelService, DuelPlayerService, ConfigService],
})
export class DuelModule {}
