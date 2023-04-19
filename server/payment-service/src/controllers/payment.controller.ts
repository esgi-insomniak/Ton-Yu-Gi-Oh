import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ICheckoutCreateResponse } from '../interfaces/payment/payment-response.interface';
import { PaymentService } from '../services/payment.service';
import {
  GetResponseArray,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { PaymentHistory } from 'src/entities/payment-history.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('get_payment_histories')
  public async getPaymentHistories(
    query: QueryGetItems,
  ): Promise<GetResponseArray<PaymentHistory>> {
    const payments = await this.paymentService.getPaymentHistories(query);
    const result: GetResponseArray<PaymentHistory> = {
      status: HttpStatus.OK,
      items: payments,
    };

    return result;
  }

  @MessagePattern('create_checkout')
  public async createCheckout(params: {
    productId: string;
    userId: string;
  }): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Product not found',
      session: null,
    };

    try {
      const session = await this.paymentService.createCheckout(
        params.productId,
        params.userId,
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
    } catch (e) {}

    return result;
  }

  @MessagePattern('update_checkout')
  public async updateCheckout(params: {
    sessionId: string;
    userId: string;
  }): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Session or Id not found',
      session: null,
    };

    try {
      const session = await this.paymentService.updateCheckout(
        params.sessionId,
        params.userId,
      );

      result = {
        status: HttpStatus.ACCEPTED,
        message: 'Session updated',
        session: {
          sessionId: session.id,
          paymentStatus: session.paymentStatus,
          url: session.url,
          coins: session.coins,
        },
      };
    } catch (e) {}

    return result;
  }
}
