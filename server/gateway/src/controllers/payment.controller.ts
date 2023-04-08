import { Controller, Get, Inject, Query, Post, Param } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetPaymentHistoriesResponseDto } from 'src/interfaces/payment-service/paymentHistory/payment-history-response.dto';
import { GetPaymentHistoriesQueryDto } from 'src/interfaces/payment-service/paymentHistory/payment-history-query.dto';
import { IPaymentHistoryGetResponse } from 'src/interfaces/payment-service/paymentHistory/payment-history-response.interface';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

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

  @Post(':id')
  public async createPayment(@Param("id") productId: string): Promise<any> {
    const payment = await this.paymentServiceClient.send('create_payment', productId);
    return payment;
  }
}
