import { Module } from '@nestjs/common';
import { MailerController } from '../controllers/mailer.controller';
import { MailerService } from '../services/mailer.service';
import { ConfigService } from '../services/config/config.service';

@Module({
  controllers: [MailerController],
  providers: [MailerService, ConfigService],
})
export class MailerModule {}
