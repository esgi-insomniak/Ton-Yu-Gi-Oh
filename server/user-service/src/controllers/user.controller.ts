import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IUserGetOneResponse,
  IUserGetResponse,
} from '../interfaces/user/user-response.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_users')
  public async getUsers(query: {
    limit: number;
    offset: number;
  }): Promise<IUserGetResponse> {
    const users = await this.userService.getUsers(query);
    const result: IUserGetResponse = {
      status: HttpStatus.OK,
      users: users,
    };

    return result;
  }

  @MessagePattern('get_user_by_id')
  public async getCardById(params: {
    id: string;
  }): Promise<IUserGetOneResponse> {
    const user = await this.userService.getUserById(params.id);
    const result = {
      status: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: user ? null : 'User not found',
      user: user,
    };

    return result;
  }

  @MessagePattern('get_user_by_credentials')
  public async getUserByCredentials(params: {
    email?: string;
    username?: string;
    phone?: string;
  }): Promise<IUserGetOneResponse> {
    const user = await this.userService.getUserByCredentials({
      email: params.email,
      username: params.username,
      phone: params.phone,
    });
    const result = {
      status: user ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: user ? null : 'Invalid credentials provided',
      user: user,
    };

    return result;
  }

  @MessagePattern('user_create')
  public async createUser(params: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<IUserGetOneResponse> {
    let result: IUserGetOneResponse = {
      status: HttpStatus.CONFLICT,
      message: 'User already exists',
      user: null,
    };

    try {
      const user = await this.userService.createUser(params);

      result = {
        status: HttpStatus.CREATED,
        user: user,
      };
    } catch (e) {}

    return result;
  }
}
