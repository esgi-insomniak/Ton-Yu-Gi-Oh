import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { CardService } from './services/card.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.CARD_SERVICE_POSTGRES_HOST,
      port: Number(process.env.CARD_SERVICE_POSTGRES_PORT),
      username: process.env.CARD_SERVICE_POSTGRES_USER,
      password: process.env.CARD_SERVICE_POSTGRES_PASSWORD,
      database: process.env.CARD_SERVICE_POSTGRES_DB,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [__dirname + '/entities/**/*.entity.js'],
      autoLoadEntities: true,
    }),
  ],
  controllers: [CardController],
  providers: [CardService, ConfigService],
})
export class CardModule {}
