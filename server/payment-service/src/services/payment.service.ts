import { Injectable } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { DataSource } from 'typeorm';
import { ConfigService } from './config/config.service';
import { PaymentCheckout } from 'src/entities/payment-checkout.entity';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: any;
  private successUrl: string;
  private cancelUrl: string;

  constructor(private dataSource: DataSource, configService: ConfigService) {
    this.stripe = new Stripe(configService.get('stripeSecretKey'), {
      apiVersion: '2022-11-15',
    });
    this.successUrl = configService.get('successUrl');
    this.cancelUrl = configService.get('cancelUrl');
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

  async createCheckout(productId: string, userId: string): Promise<PaymentCheckout> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: productId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: this.successUrl,
      cancel_url: this.cancelUrl,
    });
    const paymentCheckoutRepository = this.dataSource.getRepository(PaymentCheckout);
    const paymentCheckout = paymentCheckoutRepository.create({
      userId: userId,
      sessionId: session.id,
      paymentStatus: session.payment_status,
      url: session.url,
    })
    paymentCheckoutRepository.save(paymentCheckout);

    return session;
  }

  async updateCheckout(sessionId: string, userId: string): Promise<PaymentCheckout> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    const paymentCheckoutRepository = this.dataSource.getRepository(PaymentCheckout);
    const paymentCheckout = await paymentCheckoutRepository.findOneBy({
      sessionId: sessionId,
      userId: userId,
    });
    paymentCheckout.paymentStatus = session.payment_status;
    paymentCheckout.coins = session.amount_total;
    paymentCheckoutRepository.save(paymentCheckout);
    return paymentCheckout;
  }
}


