import { Injectable } from '@nestjs/common';
import { LoginHistory } from 'src/entities/loginHistory.entity';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class LoginHistoryService {
  private loginHistoryRepository: Repository<LoginHistory>;

  constructor(dataSource: DataSource) {
    this.loginHistoryRepository = dataSource.getRepository(LoginHistory);
  }

  async getLoginHistory(query: QueryGetItems): Promise<LoginHistory[]> {
    const loginHistories = await this.loginHistoryRepository.find({
      take: query.limit || 200,
      skip: query.offset * query.limit || 0,
      order: { createdAt: 'DESC' },
    });
    return loginHistories;
  }

  async createLoginHistory(
    loginHistoryPartial: DeepPartial<LoginHistory>,
  ): Promise<LoginHistory> {
    try {
      return this.loginHistoryRepository.save(loginHistoryPartial);
    } catch {
      return null;
    }
  }
}
