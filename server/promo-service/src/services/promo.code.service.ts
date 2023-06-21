import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { PromoCode } from 'src/entities/promoCode.entity';

@Injectable()
export class PromoCodeService {
  constructor(private readonly dataSource: DataSource) {}

  async getPromoCodes(query: QueryGetItems): Promise<PromoCode[]> {
    const promoCodes = this.dataSource.getRepository(PromoCode).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return promoCodes;
  }

  async getPromoCodeById(id: string): Promise<PromoCode> {
    const promoCode = await this.dataSource.getRepository(PromoCode).findOne({
      where: { id },
    });
    return promoCode;
  }

  async getPromoCodeByCode(code: string): Promise<PromoCode> {
    const promoCode = await this.dataSource.getRepository(PromoCode).findOne({
      where: { code },
    });
    return promoCode;
  }

  async createPromoCode(promoCode: DeepPartial<PromoCode>): Promise<PromoCode> {
    try {
      return await this.dataSource.getRepository(PromoCode).save(promoCode);
    } catch {
      return null;
    }
  }

  async updatePromoCode(id: string, promoCode: PromoCode): Promise<PromoCode> {
    try {
      await this.dataSource.getRepository(PromoCode).update(id, promoCode);
      return await this.getPromoCodeById(id);
    } catch {
      return null;
    }
  }

  async deletePromoCode(id: string): Promise<boolean> {
    const deleteResult = await this.dataSource
      .getRepository(PromoCode)
      .delete(id);
    return deleteResult.affected > 0;
  }
}
