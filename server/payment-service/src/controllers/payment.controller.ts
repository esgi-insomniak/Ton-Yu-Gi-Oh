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
  public async createCheckout(params: {
    productId: string,
    userId: string,
  }): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Product not found',
      session: null,
    };

    try {
      const session = await this.paymentService.createCheckout(
        params.productId, params.userId,
      );

      result = {
        status: HttpStatus.CREATED,
        message: null,
        session: {
          sessionId: session.id,
          paymentStatus: session.paymentStatus,
          url: session.url,
        },
      };
    } catch (e) {
    }

    return result;
  }

  @MessagePattern('update_checkout')
  public async updateCheckout(params: {
    sessionId: string,
    userId: string,
  }): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Session or Id not found',
      session: null,
    };

    try {
      const session = await this.paymentService.updateCheckout(params.sessionId, params.userId);

      result = {
        status: HttpStatus.ACCEPTED,
        message: "Session updated",
        session: {
          sessionId: session.id,
          paymentStatus: session.paymentStatus,
          url: session.url,
          coins: session.coins,
        },
      };
    } catch (e) {
    }

    return result;
  }
}
