export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.DUEL_SERVICE_PORT,
      dbHost: process.env.DUEL_SERVICE_POSTGRES_HOST,
      dbPort: process.env.DUEL_SERVICE_POSTGRES_PORT,
      dbUser: process.env.DUEL_SERVICE_POSTGRES_USER,
      dbPassword: process.env.DUEL_SERVICE_POSTGRES_PASSWORD,
      dbDatabase: process.env.DUEL_SERVICE_POSTGRES_DB,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
