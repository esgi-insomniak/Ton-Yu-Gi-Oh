import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetPaymentHistoriesResponseDto } from 'src/interfaces/payment-service/paymentHistory/payment-history-response.dto';
import { GetPaymentHistoriesQueryDto } from 'src/interfaces/payment-service/paymentHistory/payment-history-query.dto';
import { IPaymentHistoryGetResponse } from 'src/interfaces/payment-service/paymentHistory/payment-history-response.interface';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentServiceClient: ClientProxy,
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

    return {
      data: {
        payments: paymentResponse.payments,
      },
      errors: null,
    };
  }
}
