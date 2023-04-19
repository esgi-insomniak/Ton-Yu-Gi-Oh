import { Module } from '@nestjs/common';
import { UserDeckController } from '../controllers/user-deck.controller';
import { UserDeckService } from '../services/user-deck.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [UserDeckController],
  providers: [UserDeckService, ConfigService],
})
export class UserDeckModule {}
