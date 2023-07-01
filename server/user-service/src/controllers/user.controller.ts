import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_users')
  public async getUsers(query: QueryGetItems): Promise<GetResponseArray<User>> {
    const users = await this.userService.getUsers(query);
    const result: GetResponseArray<User> = {
      status: HttpStatus.OK,
      items: users,
    };

    return result;
  }

  @MessagePattern('get_user_by_id')
  public async getUserById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<User>> {
    const user = await this.userService.getUserById(params);
    const result: GetResponseOne<User> = {
      status: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: user ? null : 'User not found',
      item: user,
    };

    return result;
  }

  @MessagePattern('get_users_by_ids')
  public async getUsersByIds(params: {
    ids: string[];
  }): Promise<GetResponseArray<User>> {
    const users = await this.userService.getUsersByIds(params.ids);
    const result: GetResponseArray<User> = {
      status: users ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: users ? null : 'Users not found',
      items: users,
    };

    return result;
  }

  @MessagePattern('get_user_by_credentials')
  public async getUserByCredentials(params: {
    email?: string;
    username?: string;
    phone?: string;
  }): Promise<GetResponseOne<User>> {
    const user = await this.userService.getUserByCredentials({
      email: params.email,
      username: params.username,
      phone: params.phone,
    });
    const result: GetResponseOne<User> = {
      status: user ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: user ? null : 'Invalid credentials provided',
      item: user,
    };

    return result;
  }

  @MessagePattern('update_user_by_id')
  public async updateUserById(request: {
    params: ParamGetItemById;
    body: User;
  }): Promise<GetResponseOne<User>> {
    const user = await this.userService.updateUserById(
      request.params.id,
      request.body,
    );
    const result: GetResponseOne<User> = {
      status: user ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: user ? null : 'User not updated',
      item: user,
    };

    return result;
  }

  @MessagePattern('user_create')
  public async createUser(params: {
    username: string;
    email: string;
    phone: string;
  }): Promise<GetResponseOne<User>> {
    let result: GetResponseOne<User> = {
      status: HttpStatus.CONFLICT,
      message: 'User already exists',
      item: null,
    };

    try {
      const user = await this.userService.createUser(params);

      result = {
        status: HttpStatus.CREATED,
        item: user,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('add_coins_user')
  public async addCoinsUser(params: {
    userId: string;
    coins: number;
  }): Promise<GetResponseOne<User>> {
    let result: GetResponseOne<User> = {
      status: HttpStatus.NOT_FOUND,
      message: 'User not found',
      item: null,
    };

    try {
      const user = await this.userService.addCoinsUser(
        params.userId,
        params.coins,
      );

      result = {
        status: HttpStatus.OK,
        item: user,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('remove_coins_user')
  public async removeCoinsUser(params: {
    userId: string;
    coins: number;
  }): Promise<GetResponseOne<User>> {
    let result: GetResponseOne<User> = {
      status: HttpStatus.NOT_FOUND,
      message: 'User not found',
      item: null,
    };

    try {
      const user = await this.userService.removeCoinsUser(
        params.userId,
        params.coins,
      );

      result = {
        status: HttpStatus.OK,
        item: user,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('set_user_is_online')
  public async setUserIsOnline(params: {
    userId: string;
    isOnline: boolean;
  }): Promise<void> {
    await this.userService.setUserIsOnline(params.userId, params.isOnline);
  }
}
