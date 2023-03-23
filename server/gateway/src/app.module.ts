import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { CardController } from './cards.controller';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [CardController],
  providers: [
    ConfigService,
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
export class AppModule {}
