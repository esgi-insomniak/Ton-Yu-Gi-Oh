import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from '../modules/postgres.module';
import { UserExchangeController } from 'src/controllers/user-exchange.controller';
import { UserExchangeService } from 'src/services/user-exchange.service';
import { ProfilePictureService } from 'src/services/profile-picture.service';
import { UserRelationService } from 'src/services/user-relation.service';
import { ProfilePictureController } from 'src/controllers/profile-picture.controller';
import { UserRelationController } from 'src/controllers/user-relation.controller';

@Module({
  imports: [PostgresModule],
  controllers: [
    UserController,
    UserExchangeController,
    ProfilePictureController,
    UserRelationController,
  ],
  providers: [
    UserService,
    UserExchangeService,
    ProfilePictureService,
    UserRelationService,
    ConfigService,
  ],
})
export class UserModule {}
