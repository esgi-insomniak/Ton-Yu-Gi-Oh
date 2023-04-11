import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ITokenCreateResponse,
  ITokenDecodeResponse,
  ITokenDestroyResponse,
} from 'src/interfaces/token/token-response.interface';
import { TokenService } from '../services/token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) { }

  @MessagePattern('token_create')
  public async createToken(data: {
    userId: string;
    username: string;
    roles: string[];
    email: string;
  }): Promise<ITokenCreateResponse> {
    let result: ITokenCreateResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to create token',
      token: null,
    };

    try {
      const createTokenResult = await this.tokenService.createToken({
        userId: data.userId,
        username: data.username,
        roles: data.roles,
        email: data.email,
      });
      result = {
        status: HttpStatus.CREATED,
        token: createTokenResult,
      };
    } catch (e) { }

    return result;
  }

  @MessagePattern('token_destroy')
  public async destroyToken(data: {
    userId: string;
  }): Promise<ITokenDestroyResponse> {
    let result: ITokenDestroyResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to destroy token',
    };

    try {
      await this.tokenService.deleteTokenForUserId(data.userId);
      result = {
        status: HttpStatus.OK,
      };
    } catch (e) { }

    return result;
  }

  @MessagePattern('token_decode')
  public async decodeToken(data: {
    token: string;
  }): Promise<ITokenDecodeResponse> {
    let result: ITokenDecodeResponse = {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Invalid token provided or token not found',
    };

    if (!data.token || !data.token.startsWith('Bearer')) {
      return result;
    }
    data.token = data.token.replace('Bearer ', '');

    const decodeTokenResult = await this.tokenService.decodeToken(data.token);

    if (decodeTokenResult.userId !== null) {
      result = {
        status: HttpStatus.OK,
        data: decodeTokenResult,
      };
    }

    return result;
  }
}
