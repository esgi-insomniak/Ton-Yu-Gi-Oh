import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { UserController } from 'src/controllers/users/user.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [UserController],
})
export class UserModule {}
