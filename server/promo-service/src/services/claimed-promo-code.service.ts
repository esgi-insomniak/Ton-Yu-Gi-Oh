import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { ClaimedPromoCode } from 'src/entities/claimedPromoCode.entity';

@Injectable()
export class ClaimedPromoCodeService {
  constructor(private readonly dataSource: DataSource) {}

  async getClaimedPromoCodes(
    query: QueryGetItems,
  ): Promise<ClaimedPromoCode[]> {
    const claimedPromoCodes = this.dataSource
      .getRepository(ClaimedPromoCode)
      .find({
        take: query.limit || 10,
        skip: query.offset * query.limit || 0,
        relations: ['promoCode'],
      });
    return claimedPromoCodes;
  }

  async getClaimedPromoCodeById(id: string): Promise<ClaimedPromoCode> {
    const claimedPromoCode = await this.dataSource
      .getRepository(ClaimedPromoCode)
      .findOne({
        where: { id },
        relations: ['promoCode'],
      });
    return claimedPromoCode;
  }

  async getClaimedPromoCodeByUserId(
    userId: string,
  ): Promise<ClaimedPromoCode[]> {
    const claimedPromoCodes = await this.dataSource
      .getRepository(ClaimedPromoCode)
      .find({
        where: { userId },
        relations: ['promoCode'],
      });
    return claimedPromoCodes;
  }

  async createClaimedPromoCode(
    claimedCode: DeepPartial<ClaimedPromoCode>,
  ): Promise<ClaimedPromoCode> {
    try {
      return await this.dataSource
        .getRepository(ClaimedPromoCode)
        .save(claimedCode);
    } catch {
      return null;
    }
  }
}
