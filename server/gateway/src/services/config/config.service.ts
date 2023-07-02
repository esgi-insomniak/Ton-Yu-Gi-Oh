import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.corsOrigin = process.env.API_CORS_ORIGIN_REGEX;
    this.envConfig.cardService = {
      options: {
        port: process.env.CARD_SERVICE_PORT,
        host: process.env.CARD_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.paymentService = {
      options: {
        port: process.env.PAYMENT_SERVICE_PORT,
        host: process.env.PAYMENT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.authService = {
      options: {
        port: process.env.AUTH_SERVICE_PORT,
        host: process.env.AUTH_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.userDeckService = {
      options: {
        port: process.env.USER_DECK_SERVICE_PORT,
        host: process.env.USER_DECK_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.promoService = {
      options: {
        port: process.env.PROMO_SERVICE_PORT,
        host: process.env.PROMO_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.duelService = {
      options: {
        port: process.env.DUEL_SERVICE_PORT,
        host: process.env.DUEL_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.mailerService = {
      options: {
        port: process.env.MAILER_SERVICE_PORT,
        host: process.env.MAILER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
