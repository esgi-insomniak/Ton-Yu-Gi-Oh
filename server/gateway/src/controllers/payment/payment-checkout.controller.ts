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
