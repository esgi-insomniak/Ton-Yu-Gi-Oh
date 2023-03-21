import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'card-service-postgres',
      port: 5432,
      username: process.env.POSTGRES_USER_CARD_SERVICE,
      password: process.env.POSTGRES_PASSWORD_CARD_SERVICE,
      database: process.env.POSTGRES_DB_CARD_SERVICE,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
