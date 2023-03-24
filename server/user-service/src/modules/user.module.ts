import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from '../modules/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
