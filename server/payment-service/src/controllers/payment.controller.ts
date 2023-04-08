import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ICheckoutCreateResponse,
  IPaymentHistoryGetResponse,
} from '../interfaces/payment/payment-response.interface';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('get_payment_histories')
  public async getPaymentHistories(query: {
    limit: number;
    offset: number;
  }): Promise<IPaymentHistoryGetResponse> {
    const payments = await this.paymentService.getPaymentHistories(query);
    const result: IPaymentHistoryGetResponse = {
      status: HttpStatus.OK,
      payments: payments,
    };

    return result;
  }

  @MessagePattern('create_checkout')
  public async createCheckout(
    productId: string,
  ): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Product not found',
      session: null,
    };

    try {
      const session = await this.paymentService.createCheckout(productId);

      result = {
        status: HttpStatus.CREATED,
        message: null,
        session: {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          url: session.url,
        },
      };
    } catch (e) {}

    return result;
  }
}
