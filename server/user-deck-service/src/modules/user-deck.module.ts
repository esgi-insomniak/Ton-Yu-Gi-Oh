import { Module } from '@nestjs/common';
import { UserDeckController } from '../controllers/user-deck.controller';
import { UserDeckService } from '../services/user-deck.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { UserCardSetController } from 'src/controllers/user-card-set.controller';
import { UserSetController } from 'src/controllers/user-set.controller';
import { UserCardSetService } from 'src/services/user-card-set.service';
import { UserSetService } from 'src/services/user-set.service';

@Module({
  imports: [PostgresModule],
  controllers: [UserCardSetController, UserDeckController, UserSetController],
  providers: [
    UserCardSetService,
    UserDeckService,
    UserSetService,
    ConfigService,
  ],
})
export class UserDeckModule {}
