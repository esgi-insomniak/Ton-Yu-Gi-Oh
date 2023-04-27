import { Injectable } from '@nestjs/common';
import { Price } from 'src/entities/price.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CardPriceService {
  constructor(private readonly dataSource: DataSource) {}

  async getPrices(query: QueryGetItems): Promise<Price[]> {
    const prices = await this.dataSource.getRepository(Price).find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['card'],
    });
    return prices;
  }

  async getPriceById(id: string): Promise<Price> {
    const price = await this.dataSource.getRepository(Price).findOne({
      where: { id },
      relations: ['card'],
    });
    return price;
  }
}
