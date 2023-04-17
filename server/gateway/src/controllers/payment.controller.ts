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
import { GetPaymentHistoriesResponseDto } from 'src/interfaces/payment-service/paymentHistory/payment-history.response.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { IPaymentHistory } from 'src/interfaces/payment-service/paymentHistory/payment-history.interface';
import {
  CreateCheckoutResponseDto,
  UpdateCheckoutResponseDto,
} from 'src/interfaces/payment-service/checkout/checkout-response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { ICheckout } from 'src/interfaces/payment-service/checkout/checkout.interface';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
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

  @Authorization(true)
  @Post('checkout/:id')
  @ApiCreatedResponse({
    type: CreateCheckoutResponseDto,
  })
  public async createCheckout(
    @Param('id') productId: string,
    @Req() request: IAuthorizedRequest,
  ): Promise<CreateCheckoutResponseDto> {
    const paymentResponse: GetResponseOne<ICheckout> = await firstValueFrom(
      this.paymentServiceClient.send('create_checkout', {
        productId,
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

  @Authorization(true)
  @Post('checkout/:id/update')
  @ApiCreatedResponse({
    type: UpdateCheckoutResponseDto,
  })
  public async updateCheckout(
    @Param('id') sessionId: string,
    @Req() request: IAuthorizedRequest,
  ): Promise<UpdateCheckoutResponseDto> {
    const paymentResponse: GetResponseOne<ICheckout> = await firstValueFrom(
      this.paymentServiceClient.send('update_checkout', {
        sessionId,
        userId: request.user.id,
      }),
    );

    if (paymentResponse.status !== HttpStatus.ACCEPTED) {
      throw new HttpException(paymentResponse.message, paymentResponse.status);
    }

    if (paymentResponse.item.paymentStatus === 'paid') {
      console.log(paymentResponse.item.coins);
      await firstValueFrom(
        this.userServiceClient.send('add_coins_user', {
          userId: request.user.id,
          coins: paymentResponse.item.coins,
        }),
      );
    }

    const result: UpdateCheckoutResponseDto = {
      data: paymentResponse.item,
    };

    return result;
  }
}
