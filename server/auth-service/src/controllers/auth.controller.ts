import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IAuthCreateResponse } from 'src/interfaces/token/auth-response.interface';
import { ITokenCreateResponse } from 'src/interfaces/token/token-response.interface';
import { TokenService } from 'src/services/token.service';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @MessagePattern('create_basic_auth')
  public async createBasicAuth(data: {
    userId: string;
    password: string;
  }): Promise<IAuthCreateResponse> {
    let result: IAuthCreateResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to create basic auth',
      auth: null,
    };

    try {
      const basicAuthResult = await this.authService.createBasicAuth(
        data.userId,
        data.password,
      );
      result = {
        status: HttpStatus.CREATED,
        auth: basicAuthResult,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('compare_user_password')
  public async compareUserPassword(data: {
    userId: string;
    password: string;
  }): Promise<ITokenCreateResponse> {
    let result: ITokenCreateResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad password provided',
      token: null,
    };

    try {
      const isValidPassword = await this.authService.compareUserPassword(
        data.userId,
        data.password,
      );

      if (isValidPassword) {
        const createTokenResult = await this.tokenService.createToken(
          data.userId,
        );
        result = {
          status: HttpStatus.CREATED,
          token: createTokenResult,
        };
      }
    } catch (e) {}

    return result;
  }
}
