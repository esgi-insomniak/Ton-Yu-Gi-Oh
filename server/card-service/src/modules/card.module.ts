import { Module } from '@nestjs/common';
import { CardController } from '../controllers/card.controller';
import { CardService } from '../services/card.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DBFeederService } from 'src/services/dbFeeder.service';

@Module({
  imports: [PostgresModule, ScheduleModule.forRoot()],
  controllers: [CardController],
  providers: [CardService, DBFeederService, ConfigService],
})
export class CardModule {}
