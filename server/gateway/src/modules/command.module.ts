import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { CardController } from '../controllers/cards.controller';
import { ConfigService } from '../services/config/config.service';
import { DatabaseFeederCommand } from 'src/services/command/databaseFeeder.command.service';
import { LogService } from 'src/services/config/logger.service';

@Module({
  imports: [],
  controllers: [CardController],
  providers: [
    ConfigService,
    LogService,
    DatabaseFeederCommand,
    {
      provide: 'CARD_SERVICE',
      useFactory: (configService: ConfigService) => {
        const cardServiceOptions = configService.get('cardService');
        return ClientProxyFactory.create(cardServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModuleCommand {}
