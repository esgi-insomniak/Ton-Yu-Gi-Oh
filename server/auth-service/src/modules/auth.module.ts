import { Module } from '@nestjs/common';
import { TokenController } from '../controllers/token.controller';
import { TokenService } from '../services/token.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { LoginHistoryService } from 'src/services/login-history.service';
import { LoginHistoryController } from 'src/controllers/login-history.controller';

@Module({
  imports: [PostgresModule],
  controllers: [TokenController, AuthController, LoginHistoryController],
  providers: [
    TokenService,
    AuthService,
    LoginHistoryService,
    ConfigService,
    JwtService,
  ],
})
export class AuthModule {}
