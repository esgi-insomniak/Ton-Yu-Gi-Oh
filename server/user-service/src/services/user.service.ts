import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async getUsers(query: { limit: number; offset: number }): Promise<User[]> {
    const userRepository = this.dataSource.getRepository(User);
    const users = await userRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['sets', 'cardSets', 'decks'],
    });
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const userRepository = this.dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
      relations: ['sets', 'cardSets', 'decks'],
    });
    return user;
  }
}
