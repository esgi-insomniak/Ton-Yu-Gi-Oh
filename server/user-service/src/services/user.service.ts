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

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async getUsers(query: QueryGetItems): Promise<User[]> {
    const users = await this.userRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
      relations: ['profilePicture'],
    });
    return users;
  }

  async getUserById(param: ParamGetItemById): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: param.id },
      relations: ['profilePicture'],
    });
    return user;
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    const users: User[] = [];
    for (const id of ids) {
      const user = await this.userRepository.findOne({
        where: [
          {
            id,
          },
        ],
        relations: ['profilePicture'],
      });
      if (user) users.push(user);
    }
    return users;
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
      relations: ['profilePicture'],
    });
    return user;
  }

  async createUser(params: {
    username: string;
    email: string;
    phone: string;
  }): Promise<User> {
    const user = await this.userRepository.save({
      username: params.username,
      email: params.email,
      phone: params.phone,
    });
    return await this.getUserById({ id: user.id });
  }

  async updateUserById(id: string, user: User): Promise<User> {
    try {
      await this.userRepository.update(id, user);
      return await this.getUserById({ id });
    } catch {
      return null;
    }
  }

  async addCoinsUser(userId: string, coins: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profilePicture'],
    });
    user.coins += coins;
    return this.userRepository.save(user);
  }

  async removeCoinsUser(userId: string, coins: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profilePicture'],
    });
    user.coins -= coins;
    return this.userRepository.save(user);
  }

  async setUserIsOnline(userId: string, isOnline: boolean): Promise<User> {
    const user = await this.getUserById({ id: userId });
    user.isOnline = isOnline;
    return this.userRepository.save(user);
  }

  async deleteAllUsers(): Promise<void> {
    await this.userRepository.clear();
  }
}
