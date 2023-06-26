import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginHistory } from 'src/entities/loginHistory.entity';
import {
  GetResponseArray,
  GetResponseOne,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { LoginHistoryService } from 'src/services/login-history.service';
import { DeepPartial } from 'typeorm';

@Controller('login_history')
export class LoginHistoryController {
  constructor(private readonly loginHistoryService: LoginHistoryService) {}

  @MessagePattern('get_login_histories')
  public async getLoginHistories(
    query: QueryGetItems,
  ): Promise<GetResponseArray<LoginHistory>> {
    const loginHistories = await this.loginHistoryService.getLoginHistory(
      query,
    );
    const result: GetResponseArray<LoginHistory> = {
      status: HttpStatus.OK,
      items: loginHistories,
    };

    return result;
  }

  @MessagePattern('create_login_history')
  public async getLoginHistory(
    body: DeepPartial<LoginHistory>,
  ): Promise<GetResponseOne<LoginHistory>> {
    const loginHistory = await this.loginHistoryService.createLoginHistory(
      body,
    );
    const result: GetResponseOne<LoginHistory> = {
      status: loginHistory ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: loginHistory ? null : 'LoginHistory not created',
      item: loginHistory,
    };

    return result;
  }
}
