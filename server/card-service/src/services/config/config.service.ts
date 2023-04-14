export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.CARD_SERVICE_PORT,
      dbHost: process.env.CARD_SERVICE_POSTGRES_HOST,
      dbPort: process.env.CARD_SERVICE_POSTGRES_PORT,
      dbUser: process.env.CARD_SERVICE_POSTGRES_USER,
      dbPassword: process.env.CARD_SERVICE_POSTGRES_PASSWORD,
      dbDatabase: process.env.CARD_SERVICE_POSTGRES_DB,
      yugiohApi: process.env.CARD_SERVICE_YUGIOH_API,
      yugiohLanguage: process.env.CARD_SERVICE_YUGIOH_LANGUAGE,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
