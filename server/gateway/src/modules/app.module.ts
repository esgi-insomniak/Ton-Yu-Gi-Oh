import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { CardController } from '../controllers/cards.controller';
import { UserController } from '../controllers/users.controller';
import { ConfigService } from '../services/config/config.service';

@Module({
  imports: [],
  controllers: [CardController, UserController],
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
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
