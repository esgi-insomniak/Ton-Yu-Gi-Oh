import { Injectable } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { DataSource } from 'typeorm';
import { ConfigService } from './config/config.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: any;

  constructor(private dataSource: DataSource, configService: ConfigService) {
    this.stripe = new Stripe(configService.get('stripeSecretKey'), {
      apiVersion: '2022-11-15',
    });
  }

  async getPaymentHistories(query: {
    limit: number;
    offset: number;
  }): Promise<PaymentHistory[]> {
    const paymentRepository = this.dataSource.getRepository(PaymentHistory);
    const payments = await paymentRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return payments;
  }

  async createCheckout(productId: string): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: productId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return session;
  }
}
