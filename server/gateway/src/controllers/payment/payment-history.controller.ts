import { Controller, Get, Param, Inject, Query, Req } from '@nestjs/common';
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
import { Authorization } from 'src/decorators/authorization.decorator';
import { Permission } from 'src/decorators/permission.decorator';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import {
  IUser,
  IUserRoles,
} from 'src/interfaces/user-service/user/user.interface';
import { MeToId } from 'src/decorators/me-to-id.decorator';

@Controller('payment_histories')
@ApiTags('PaymentHistory')
export class PaymentHistoryController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @Permission(['admin'], true)
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

@Controller('users')
@ApiTags('PaymentHistory')
export class PaymentHistoryUserController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get(':id/payment_histories')
  @Authorization(true)
  @MeToId()
  @ApiCreatedResponse({
    type: GetPaymentHistoriesResponseDto,
  })
  public async getPaymentHistories(
    @Param() params: GetItemByIdDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<GetPaymentHistoriesResponseDto> {
    if (
      request.user.id !== params.id &&
      !request.user.roles.includes(IUserRoles.admin)
    ) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', { id: params.id }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const paymentResponse: GetResponseArray<IPaymentHistory> =
      await firstValueFrom(
        this.paymentServiceClient.send('get_payment_histories_by_user_id', {
          id: params.id,
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
