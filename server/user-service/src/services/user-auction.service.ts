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
    const newAuction = await this.AuctionRepository.save(auction);
    return newAuction;
  }

  async getActualAuction(): Promise<Auction> {
    const actualAction = await this.AuctionRepository.findOne({
      where: [
        {
          isClosed: false,
        },
      ],
    });

    return actualAction;
  }
}
