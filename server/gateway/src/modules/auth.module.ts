import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [AuthController],
})
export class AuthModule {}
