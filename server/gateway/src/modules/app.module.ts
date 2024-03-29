import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ConfigService } from '../services/config/config.service';
import { AuthGuard } from 'src/services/guard/authorization.guard';
import { PermissionGuard } from 'src/services/guard/permission.guard';
import { LogService } from 'src/services/config/logger.service';
import { CardModule } from './card.module';
import { PaymentModule } from './payment.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { MailerModule } from './mailer.module';
import { WebsocketModule } from './websoket.module';
import { PromoModule } from './promo.module';
import { DuelModule } from './duel.module';
import { MeToIdGuard } from 'src/services/guard/me-to-id.guard';
import { PingModule } from './ping.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TestModule } from './test.module';

@Module({
  imports: [
    CardModule,
    PaymentModule,
    UserModule,
    AuthModule,
    PromoModule,
    DuelModule,
    MailerModule,
    WebsocketModule,
    PingModule,
    TestModule,
    // ThrottlerModule.forRoot({
    //   ttl: 5,
    //   limit: 15,
    // }),
  ],
  providers: [
    ConfigService,
    LogService,
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
    {
      provide: 'USER_DECK_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userDeckServiceOptions = configService.get('userDeckService');
        return ClientProxyFactory.create(userDeckServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PROMO_SERVICE',
      useFactory: (configService: ConfigService) => {
        const promoServiceOptions = configService.get('promoService');
        return ClientProxyFactory.create(promoServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'DUEL_SERVICE',
      useFactory: (configService: ConfigService) => {
        const duelServiceOptions = configService.get('duelService');
        return ClientProxyFactory.create(duelServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mailerServiceOptions = configService.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MeToIdGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
  exports: [
    'CARD_SERVICE',
    'USER_SERVICE',
    'PAYMENT_SERVICE',
    'AUTH_SERVICE',
    'USER_DECK_SERVICE',
    'PROMO_SERVICE',
    'DUEL_SERVICE',
    'MAILER_SERVICE',
  ],
})
export class AppModule {}
