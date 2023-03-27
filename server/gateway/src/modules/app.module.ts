import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { CardController } from '../controllers/cards.controller';
import { UserController } from '../controllers/users.controller';
import { ConfigService } from '../services/config/config.service';
import { PaymentController } from '../controllers/payment.controller';

@Module({
  imports: [],
  controllers: [CardController, UserController, PaymentController],
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
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const paymentServiceOptions = configService.get('paymentService');
        return ClientProxyFactory.create(paymentServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
