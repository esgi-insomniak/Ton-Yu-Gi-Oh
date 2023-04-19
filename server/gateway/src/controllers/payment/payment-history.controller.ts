import { Controller, Get, Inject, Query } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetPaymentHistoriesResponseDto } from 'src/interfaces/payment-service/paymentHistory/payment-history.response.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { GetResponseArray } from 'src/interfaces/common/common.response';
import { IPaymentHistory } from 'src/interfaces/payment-service/paymentHistory/payment-history.interface';

@Controller('payment_histories')
@ApiTags('PaymentHistory')
export class PaymentHistoryController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: GetPaymentHistoriesResponseDto,
  })
  public async getPaymentHistories(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetPaymentHistoriesResponseDto> {
    const paymentResponse: GetResponseArray<IPaymentHistory> =
      await firstValueFrom(
        this.paymentServiceClient.send('get_payment_histories', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (paymentResponse.status !== HttpStatus.OK) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    const result: GetPaymentHistoriesResponseDto = {
      data: paymentResponse.items,
    };

    return result;
  }
}
