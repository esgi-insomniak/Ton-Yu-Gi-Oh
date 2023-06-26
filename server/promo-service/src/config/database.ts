import { ConfigService } from '../services/config/config.service';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('dbHost'),
  port: configService.get('dbPort'),
  username: configService.get('dbUser'),
  password: configService.get('dbPassword'),
  database: configService.get('dbDatabase'),
  entities: [`${__dirname}/../entities/**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/*-migration.{js,ts}`],
  migrationsTableName: 'migrations',
});

export default postgresDataSource;
