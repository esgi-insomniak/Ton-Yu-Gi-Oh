import {
  Controller,
  Inject,
  Post,
  Param,
  Req,
  Body,
  Patch,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { GetResponseOne } from 'src/interfaces/common/common.response';
import {
  CreateCheckoutResponseDto,
  UpdateCheckoutResponseDto,
} from 'src/interfaces/payment-service/checkout/checkout.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { ICheckout } from 'src/interfaces/payment-service/checkout/checkout.interface';
import { CreatePaymentCheckoutBodyDto } from 'src/interfaces/payment-service/checkout/checkout.body.dto';
import { UpdatePaymentCheckoutBodyDto } from 'src/interfaces/payment-service/checkout/checkout.param.dto';
import { IPaymentHistory } from 'src/interfaces/payment-service/paymentHistory/payment-history.interface';

@Controller('payment_checkout')
@ApiTags('PaymentCheckout')
export class PaymentCheckoutController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  @Post()
  @Authorization(true)
  @ApiCreatedResponse({
    type: CreateCheckoutResponseDto,
  })
  public async createPaymentCheckout(
    @Body() body: CreatePaymentCheckoutBodyDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<CreateCheckoutResponseDto> {
    const paymentResponse: GetResponseOne<ICheckout> = await firstValueFrom(
      this.paymentServiceClient.send('create_checkout', {
        productId: body.productId,
        userId: request.user.id,
      }),
    );

    if (paymentResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    const result: CreateCheckoutResponseDto = {
      data: paymentResponse.item,
    };

    return result;
  }

  @Patch(':sessionId')
  @Authorization(true)
  @ApiCreatedResponse({
    type: UpdateCheckoutResponseDto,
  })
  public async updatePaymentCheckout(
    @Param() param: UpdatePaymentCheckoutBodyDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<UpdateCheckoutResponseDto> {
    const checkoutResponse: GetResponseOne<ICheckout> = await firstValueFrom(
      this.paymentServiceClient.send('get_checkout', {
        sessionId: param.sessionId,
        userId: request.user.id,
      }),
    );

    if (checkoutResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        checkoutResponse.message,
        checkoutResponse.status,
      );
    }

    if (checkoutResponse.item.paymentStatus === 'paid') {
      throw new HttpException('Product already paid', HttpStatus.BAD_REQUEST);
    }

    const paymentResponse: GetResponseOne<ICheckout> = await firstValueFrom(
      this.paymentServiceClient.send('update_checkout', {
        sessionId: param.sessionId,
        userId: request.user.id,
      }),
    );

    if (paymentResponse.status !== HttpStatus.ACCEPTED) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    if (paymentResponse.item.paymentStatus === 'paid') {
      const newPaymentHistory: Partial<IPaymentHistory> = {
        userId: request.user.id,
        sessionId: paymentResponse.item.sessionId,
        coinsAmount: paymentResponse.item.coins,
        stripeInfo: JSON.stringify(paymentResponse.item),
      };

      const paymentHistoryResponse = await firstValueFrom(
        this.paymentServiceClient.send(
          'create_payment_history',
          newPaymentHistory,
        ),
      );

      if (paymentHistoryResponse.status !== HttpStatus.CREATED) {
        throw new HttpException(
          paymentHistoryResponse.message,
          paymentHistoryResponse.status,
        );
      }

      await firstValueFrom(
        this.userServiceClient.send('add_coins_user', {
          userId: request.user.id,
          coins: paymentResponse.item.coins,
        }),
      );
    } else {
      throw new HttpException('Payment not completed', HttpStatus.BAD_REQUEST);
    }

    const result: UpdateCheckoutResponseDto = {
      data: paymentResponse.item,
    };

    return result;
  }
}
