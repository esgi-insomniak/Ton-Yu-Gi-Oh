import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { UserController } from 'src/controllers/users/user.controller';
import { ProfilePictureController } from 'src/controllers/users/profile-picture.controller';
import {
  UserExchangeController,
  UserExchangeUserController,
} from 'src/controllers/users/user-exchange.controller';
import {
  UserRelationController,
  UserRelationUserController,
} from 'src/controllers/users/user-relation.controller';
import { AuctionController } from 'src/controllers/users/user-auction.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [
    UserController,
    ProfilePictureController,
    UserExchangeController,
    UserExchangeUserController,
    UserRelationController,
    UserRelationUserController,
    AuctionController,
  ],
})
export class UserModule {}
