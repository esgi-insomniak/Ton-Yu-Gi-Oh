import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Param,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetPaymentHistoriesResponseDto } from 'src/interfaces/payment-service/paymentHistory/payment-history-response.dto';
import { GetPaymentHistoriesQueryDto } from 'src/interfaces/payment-service/paymentHistory/payment-history-query.dto';
import { IPaymentHistoryGetResponse } from 'src/interfaces/payment-service/paymentHistory/payment-history-response.interface';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateCheckoutResponseDto } from 'src/interfaces/payment-service/checkout/checkout-response.dto';
import { ICheckoutCreateResponse } from 'src/interfaces/payment-service/checkout/checkout-response.interface';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { UpdateCheckoutResponse } from 'src/interfaces/payment-service/update/update-response.dto';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: GetPaymentHistoriesResponseDto,
  })
  public async getPaymentHistories(
    @Query() query: GetPaymentHistoriesQueryDto,
  ): Promise<GetPaymentHistoriesResponseDto> {
    const paymentResponse: IPaymentHistoryGetResponse = await firstValueFrom(
      this.paymentServiceClient.send('get_payment_histories', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (paymentResponse.status !== HttpStatus.OK) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    const result: GetPaymentHistoriesResponseDto = {
      data: paymentResponse.payments,
    };

    return result;
  }

  @Authorization(true)
  @Post('checkout/:id')
  @ApiCreatedResponse({
    type: CreateCheckoutResponseDto,
  })
  public async createCheckout(
    @Param('id') productId: string,
    @Req() request: IAuthorizedRequest,
  ): Promise<CreateCheckoutResponseDto> {
    const paymentResponse: ICheckoutCreateResponse = await firstValueFrom(
      this.paymentServiceClient.send('create_checkout', {
        productId,
        userId: request.user.id,
      }),
    );

    if (paymentResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    const result: CreateCheckoutResponseDto = {
      data: paymentResponse.session,
    };

    return result;
  }

  @Authorization(true)
  @Post('checkout/:id/update')
  @ApiCreatedResponse({
    type: UpdateCheckoutResponse,
  })
  public async updateCheckout(
    @Param('id') sessionId: string,
    @Req() request: IAuthorizedRequest,
  ): Promise<UpdateCheckoutResponse> {
    const paymentResponse: ICheckoutCreateResponse = await firstValueFrom(
      this.paymentServiceClient.send('update_checkout', {sessionId, userId: request.user.id}),
    );

    if (paymentResponse.status !== HttpStatus.ACCEPTED) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    const result: UpdateCheckoutResponse = {
      data: paymentResponse.session,
    };

    return result;
  }
}
