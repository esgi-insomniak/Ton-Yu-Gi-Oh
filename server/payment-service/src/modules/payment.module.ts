import { Module } from '@nestjs/common';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentService } from '../services/payment.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [PaymentController],
  providers: [PaymentService, ConfigService],
})
export class PaymentModule {}
