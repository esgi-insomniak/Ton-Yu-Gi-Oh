import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PromoCode } from 'src/entities/promoCode.entity';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { PromoCodeService } from 'src/services/promo.code.service';
import { DeepPartial } from 'typeorm';

@Controller('promo_code')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @MessagePattern('get_promo_codes')
  public async getPromoCodes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<PromoCode>> {
    const promoCodes = await this.promoCodeService.getPromoCodes(query);
    const result: GetResponseArray<PromoCode> = {
      status: HttpStatus.OK,
      items: promoCodes,
    };

    return result;
  }

  @MessagePattern('get_promo_code_by_id')
  public async getPromoCodeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<PromoCode>> {
    const promoCode = await this.promoCodeService.getPromoCodeById(params.id);
    const result: GetResponseOne<PromoCode> = {
      status: promoCode ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: promoCode ? null : 'PromoCode not found',
      item: promoCode,
    };

    return result;
  }

  @MessagePattern('get_promo_code_by_code')
  public async getPromoCodeByCode(params: {
    code: string;
  }): Promise<GetResponseOne<PromoCode>> {
    const promoCode = await this.promoCodeService.getPromoCodeByCode(
      params.code,
    );
    const result: GetResponseOne<PromoCode> = {
      status: promoCode ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: promoCode ? null : 'PromoCode not found',
      item: promoCode,
    };

    return result;
  }

  @MessagePattern('create_promo_code')
  public async createPromoCode(
    body: DeepPartial<PromoCode>,
  ): Promise<GetResponseOne<PromoCode>> {
    const promoCode = await this.promoCodeService.createPromoCode(body);
    const result: GetResponseOne<PromoCode> = {
      status: promoCode ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: promoCode ? null : 'PromoCode not created',
      item: promoCode,
    };

    return result;
  }

  @MessagePattern('update_promo_code_by_id')
  public async updatePromoCodeById(request: {
    params: ParamGetItemById;
    body: PromoCode;
  }): Promise<GetResponseOne<PromoCode>> {
    const promoCode = await this.promoCodeService.updatePromoCode(
      request.params.id,
      request.body,
    );
    const result: GetResponseOne<PromoCode> = {
      status: promoCode ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: promoCode ? null : 'PromoCode not updated',
      item: promoCode,
    };

    return result;
  }

  @MessagePattern('delete_promo_code_by_id')
  public async deletePromoCodeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<boolean>> {
    const promoCodeDeleted = await this.promoCodeService.deletePromoCode(
      params.id,
    );

    const result: GetResponseOne<boolean> = {
      status: promoCodeDeleted ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: promoCodeDeleted ? null : 'PromoCode not deleted',
      item: promoCodeDeleted,
    };

    return result;
  }
}
