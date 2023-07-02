import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [],
})
export class MailerModule {}
