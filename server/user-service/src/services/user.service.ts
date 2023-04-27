import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import {
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async getUsers(query: QueryGetItems): Promise<User[]> {
    const users = await this.userRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return users;
  }

  async getUserById(param: ParamGetItemById): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: param.id },
    });
    return user;
  }

  async getUserByCredentials(data: {
    email?: string;
    username?: string;
    phone?: string;
  }): Promise<User> {
    if (!data.email && !data.username && !data.phone) {
      return null;
    }
    const user = await this.userRepository.findOne({
      where: [
        data.email ? { email: data.email } : null,
        data.username ? { username: data.username } : null,
        data.phone ? { phone: data.phone } : null,
      ],
    });
    return user;
  }

  async createUser(params: {
    username: string;
    email: string;
    phone: string;
  }): Promise<User> {
    const user = this.userRepository.create({
      username: params.username,
      email: params.email,
      phone: params.phone,
    });
    return this.userRepository.save(user);
  }

  async addCoinsUser(userId: string, coins: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.coins += coins;
    return this.userRepository.save(user);
  }

  async removeCoinsUser(userId: string, coins: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.coins -= coins;
    return this.userRepository.save(user);
  }
}
