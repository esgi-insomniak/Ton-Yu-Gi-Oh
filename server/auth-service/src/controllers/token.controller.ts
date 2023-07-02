import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenService } from '../services/token.service';
import {
  DefaultResponse,
  GetResponseOne,
} from 'src/interfaces/common/common.response.interface';
import { Token } from 'src/entities/token.entity';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('token_create')
  public async createToken(data: {
    userId: string;
  }): Promise<GetResponseOne<Token>> {
    let result: GetResponseOne<Token> = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to create token',
      item: null,
    };

    try {
      const createTokenResult = await this.tokenService.createToken({
        userId: data.userId,
      });
      result = {
        status: HttpStatus.CREATED,
        item: createTokenResult,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('token_destroy')
  public async destroyToken(data: {
    userId: string;
  }): Promise<DefaultResponse> {
    let result: DefaultResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to destroy token',
    };

    try {
      await this.tokenService.deleteTokenForUserId(data.userId);
      result = {
        status: HttpStatus.OK,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('token_decode')
  public async decodeToken(data: {
    token: string;
  }): Promise<GetResponseOne<{ userId: string }>> {
    let result: GetResponseOne<{ userId: string }> = {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Invalid token provided or token not found',
      item: null,
    };

    if (!data.token || !data.token.startsWith('Bearer')) {
      return result;
    }
    data.token = data.token.replace('Bearer ', '');

    const decodeTokenResult = await this.tokenService.decodeToken(data.token);

    if (decodeTokenResult.userId !== null) {
      result = {
        status: HttpStatus.OK,
        item: decodeTokenResult,
      };
    }

    return result;
  }
}
