export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.MAILER_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.websiteUrl = process.env.WEBSITE_URL;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.mailerApiKey = process.env.MAILER_SERVICE_API_KEY;
    this.envConfig.mailerDSN = process.env.MAILER_SERVICE_DSN;
    this.envConfig.mailerUser = process.env.MAILER_SERVICE_USER;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
