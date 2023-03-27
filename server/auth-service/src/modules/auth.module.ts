import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class UserModule {}
