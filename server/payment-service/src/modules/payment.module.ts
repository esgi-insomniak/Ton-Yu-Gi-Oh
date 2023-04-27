import { Module } from '@nestjs/common';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { PaymentCheckoutController } from 'src/controllers/payment-checkout.controller';
import { PaymentHistoryController } from 'src/controllers/payment-history.controller';
import { PaymentCheckoutService } from 'src/services/payment-checkout.service';
import { PaymentHistoryService } from 'src/services/payment-history.service';

@Module({
  imports: [PostgresModule],
  controllers: [PaymentCheckoutController, PaymentHistoryController],
  providers: [PaymentCheckoutService, PaymentHistoryService, ConfigService],
})
export class PaymentModule {}
