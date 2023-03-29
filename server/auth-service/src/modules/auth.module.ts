import { Module } from '@nestjs/common';
import { TokenController } from '../controllers/token.controller';
import { TokenService } from '../services/token.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [PostgresModule],
  controllers: [TokenController, AuthController],
  providers: [TokenService, AuthService, ConfigService, JwtService],
})
export class AuthModule {}
