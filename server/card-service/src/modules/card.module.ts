import { Module } from '@nestjs/common';
import { CardController } from '../controllers/card.controller';
import { CardService } from '../services/card.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [CardController],
  providers: [CardService, ConfigService],
})
export class CardModule {}
