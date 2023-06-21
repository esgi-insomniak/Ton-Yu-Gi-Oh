import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClaimedPromoCode } from 'src/entities/claimedPromoCode.entity';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { ClaimedPromoCodeService } from 'src/services/claimed-promo-code.service';
import { DeepPartial } from 'typeorm';

@Controller('claimed_promo_code')
export class ClaimedPromoCodeController {
  constructor(
    private readonly claimedPromoCodeService: ClaimedPromoCodeService,
  ) {}

  @MessagePattern('get_claimed_promo_codes')
  public async getClaimedPromoCodes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<ClaimedPromoCode>> {
    const claimedPromoCodes =
      await this.claimedPromoCodeService.getClaimedPromoCodes(query);
    const result: GetResponseArray<ClaimedPromoCode> = {
      status: HttpStatus.OK,
      items: claimedPromoCodes,
    };

    return result;
  }

  @MessagePattern('get_claimed_promo_code_by_id')
  public async getClaimedPromoCdeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<ClaimedPromoCode>> {
    const claimedPromoCode =
      await this.claimedPromoCodeService.getClaimedPromoCodeById(params.id);
    const result: GetResponseOne<ClaimedPromoCode> = {
      status: claimedPromoCode ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: claimedPromoCode ? null : 'ClaimedPromoCode not found',
      item: claimedPromoCode,
    };

    return result;
  }

  @MessagePattern('get_claimed_promo_codes_by_user_id')
  public async getClaimedPromoCodeByUserId(params: {
    userId: string;
  }): Promise<GetResponseArray<ClaimedPromoCode>> {
    const claimedPromoCode =
      await this.claimedPromoCodeService.getClaimedPromoCodeByUserId(
        params.userId,
      );
    const result: GetResponseArray<ClaimedPromoCode> = {
      status: claimedPromoCode ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: claimedPromoCode ? null : 'ClaimedPromoCode not found',
      items: claimedPromoCode,
    };

    return result;
  }

  @MessagePattern('create_claimed_promo_code')
  public async createClaimedPromoCode(
    body: DeepPartial<ClaimedPromoCode>,
  ): Promise<GetResponseOne<ClaimedPromoCode>> {
    const claimedPromoCode =
      await this.claimedPromoCodeService.createClaimedPromoCode(body);
    const result: GetResponseOne<ClaimedPromoCode> = {
      status: claimedPromoCode ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: claimedPromoCode ? null : 'ClaimedPromoCode not created',
      item: claimedPromoCode,
    };

    return result;
  }
}
