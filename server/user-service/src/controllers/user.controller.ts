import { Controller } from '@nestjs/common';
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

    return {
      users: users,
    };
  }

  @MessagePattern('get_user_by_id')
  public async getCardById(params: {
    id: string;
  }): Promise<IUserGetOneResponse> {
    const user = await this.userService.getUserById(params.id);

    return {
      user: user,
    };
  }
}
