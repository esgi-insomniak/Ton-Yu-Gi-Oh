import { Injectable } from '@nestjs/common';
import { Auction } from 'src/entities/userAuction.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class AuctionService {
  private AuctionRepository: Repository<Auction>;

  constructor(dataSource: DataSource) {
    this.AuctionRepository = dataSource.getRepository(Auction);
  }

  async createAuction(auction: DeepPartial<Auction>): Promise<Auction> {
    try {
      return await this.AuctionRepository.save(auction);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateAuctionById(
    id: string,
    auction: DeepPartial<Auction>,
  ): Promise<Auction> {
    try {
      await this.AuctionRepository.update(id, auction);
      return await this.AuctionRepository.findOne({
        where: {
          id,
        },
        relations: ['winner'],
      });
    } catch {
      return null;
    }
  }

  async getActualAuction(): Promise<Auction> {
    const actualAction = await this.AuctionRepository.findOne({
      where: {
        isClosed: false,
      },
      relations: ['winner'],
    });

    return actualAction;
  }
}
