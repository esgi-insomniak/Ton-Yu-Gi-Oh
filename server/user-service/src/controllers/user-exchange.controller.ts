import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { UserExchange } from 'src/entities/userExchange.entity';
import { UserExchangeService } from 'src/services/user-exchange.service';
import { DeepPartial } from 'typeorm';

@Controller('exchange')
export class UserExchangeController {
  constructor(private readonly userExchangeService: UserExchangeService) {}

  @MessagePattern('get_user_exchanges')
  public async getUserExchanges(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserExchange>> {
    const userExchanges = await this.userExchangeService.getUserExchanges(
      query,
    );
    const result: GetResponseArray<UserExchange> = {
      status: HttpStatus.OK,
      items: userExchanges,
    };

    return result;
  }

  @MessagePattern('get_user_exchanges_by_user_id')
  public async getUserExchangesByUserId(request: {
    params: { userId: string };
    query: QueryGetItems;
  }): Promise<GetResponseArray<UserExchange>> {
    const userExchanges =
      await this.userExchangeService.getUserExchangesByUserId(
        request.params.userId,
        request.query,
      );
    const result: GetResponseArray<UserExchange> = {
      status: HttpStatus.OK,
      items: userExchanges,
    };

    return result;
  }

  @MessagePattern('get_user_exchange_by_id')
  public async getCardById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserExchange>> {
    const user = await this.userExchangeService.getUserExchangeById(params);
    const result: GetResponseOne<UserExchange> = {
      status: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: user ? null : 'Exchange not found',
      item: user,
    };

    return result;
  }

  @MessagePattern('create_user_exchange')
  public async createUserExchange(
    body: DeepPartial<UserExchange>,
  ): Promise<GetResponseOne<UserExchange>> {
    const userExchange = await this.userExchangeService.createUserExchange(
      body,
    );
    const result: GetResponseOne<UserExchange> = {
      status: userExchange ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: userExchange ? null : 'Exchange not created',
      item: userExchange,
    };

    return result;
  }

  @MessagePattern('update_user_exchange_by_id')
  public async updateUserExchangeById(
    params: ParamGetItemById,
    body: UserExchange,
  ): Promise<GetResponseOne<UserExchange>> {
    const userExchange = await this.userExchangeService.updateUserExchangeById(
      params.id,
      body,
    );
    const result: GetResponseOne<UserExchange> = {
      status: userExchange ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userExchange ? null : 'Exchange not found',
      item: userExchange,
    };

    return result;
  }
}
