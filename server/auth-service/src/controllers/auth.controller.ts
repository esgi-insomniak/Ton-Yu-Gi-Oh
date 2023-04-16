import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenService } from 'src/services/token.service';
import { AuthService } from '../services/auth.service';
import { GetResponseOne } from 'src/interfaces/common/common.response.interface';
import { BasicAuth } from 'src/entities/basic-auth.entity';
import { Token } from 'src/entities/token.entity';

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
  }): Promise<GetResponseOne<BasicAuth>> {
    let result: GetResponseOne<BasicAuth> = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to create basic auth',
      item: null,
    };

    try {
      const basicAuthResult = await this.authService.createBasicAuth(
        data.userId,
        data.password,
      );
      result = {
        status: HttpStatus.CREATED,
        item: basicAuthResult,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('compare_user_password')
  public async compareUserPassword(data: {
    userId: string;
    password: string;
    username: string;
    roles: string[];
    email: string;
  }): Promise<GetResponseOne<Token>> {
    let result: GetResponseOne<Token> = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad password provided',
      item: null,
    };

    try {
      const isValidPassword = await this.authService.compareUserPassword(
        data.userId,
        data.password,
      );

      if (isValidPassword) {
        const createTokenResult = await this.tokenService.createToken({
          userId: data.userId,
          username: data.username,
          roles: data.roles,
          email: data.email,
        });
        result = {
          status: HttpStatus.CREATED,
          item: createTokenResult,
        };
      }
    } catch (e) {}

    return result;
  }
}
