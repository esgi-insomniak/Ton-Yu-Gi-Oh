import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
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
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
