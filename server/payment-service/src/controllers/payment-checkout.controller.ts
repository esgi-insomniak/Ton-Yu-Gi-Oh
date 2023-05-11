import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ICheckoutCreateResponse } from '../interfaces/payment/payment-response.interface';
import { PaymentCheckoutService } from 'src/services/payment-checkout.service';

@Controller('payment_checkout')
export class PaymentCheckoutController {
  constructor(
    private readonly paymentCheckoutService: PaymentCheckoutService,
  ) {}

  @MessagePattern('create_checkout')
  public async createCheckout(params: {
    productId: string;
    userId: string;
  }): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Product not found or stripe private key not add in .env',
      item: null,
    };

    try {
      const session = await this.paymentCheckoutService.createCheckout(
        params.productId,
        params.userId,
      );

      result = {
        status: HttpStatus.CREATED,
        message: null,
        item: {
          sessionId: session.id,
          paymentStatus: session.paymentStatus,
          url: session.url,
        },
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('get_checkout')
  public async getCheckout(params: {
    sessionId: string;
    userId: string;
  }): Promise<ICheckoutCreateResponse> {
    let result: ICheckoutCreateResponse = {
      status: HttpStatus.NOT_FOUND,
      message: 'Checkout not found',
      item: null,
    };

    try {
      const session = await this.paymentCheckoutService.getCheckout(
        params.sessionId,
        params.userId,
      );

      if (!session) return result;

      result = {
        status: HttpStatus.OK,
        message: null,
        item: {
          sessionId: session.id,
          paymentStatus: session.paymentStatus,
          url: session.url,
          coins: session.coins,
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
      item: null,
    };

    try {
      const session = await this.paymentCheckoutService.updateCheckout(
        params.sessionId,
        params.userId,
      );

      result = {
        status: HttpStatus.ACCEPTED,
        message: 'Session updated',
        item: {
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
