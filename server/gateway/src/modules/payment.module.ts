import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { PaymentCheckoutController } from 'src/controllers/payment/payment-checkout.controller';
import { PaymentHistoryController } from 'src/controllers/payment/payment-history.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [PaymentCheckoutController, PaymentHistoryController],
})
export class PaymentModule {}
