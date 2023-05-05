import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenService } from 'src/services/token.service';
import { AuthService } from '../services/auth.service';
import {
  DefaultResponse,
  GetResponseOne,
} from 'src/interfaces/common/common.response.interface';
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

  @MessagePattern('generate_basic_auth_renew_token')
  public async generateBasicAuthRenewToken(data: {
    userId: string;
  }): Promise<GetResponseOne<Pick<BasicAuth, 'renewToken'>>> {
    let result: GetResponseOne<Pick<BasicAuth, 'renewToken'>> = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to generate basic auth renew token',
      item: null,
    };

    try {
      const generateBasicAuthRenewTokenResult =
        await this.authService.generateBasicAuthRenewToken(data.userId);
      result = {
        status: HttpStatus.CREATED,
        item: generateBasicAuthRenewTokenResult,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('get_basic_auth_confirmation_token')
  public async getAccountIsConfirmed(data: {
    userId: string;
  }): Promise<GetResponseOne<Pick<BasicAuth, 'confirmationToken'>>> {
    let result: GetResponseOne<Pick<BasicAuth, 'confirmationToken'>> = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to check if account is active',
      item: null,
    };

    try {
      const getBasicAuthTokensResult =
        await this.authService.getBasicAuthConfirmationToken(data.userId);
      result = {
        status: HttpStatus.OK,
        item: {
          confirmationToken: getBasicAuthTokensResult.confirmationToken,
        },
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('reset_basic_auth_password')
  public async resetBasicAuthPassword(data: {
    renewToken: string;
    password: string;
  }): Promise<DefaultResponse> {
    let result: DefaultResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to reset password',
    };

    try {
      const passwordChanged = await this.authService.changeBasicAuthPassword(
        data.renewToken,
        data.password,
      );

      if (!passwordChanged) {
        return result;
      }

      result = {
        status: HttpStatus.NO_CONTENT,
      };
    } catch (e) {}

    return result;
  }

  @MessagePattern('confirm_basic_auth_account')
  public async confirmBasicAuthAccount(data: {
    confirmationToken: string;
  }): Promise<DefaultResponse> {
    let result: DefaultResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Failed to confirm account',
    };

    try {
      const accountConfirmed = await this.authService.confirmBasicAuthAccount(
        data.confirmationToken,
      );

      if (!accountConfirmed) {
        return result;
      }

      result = {
        status: HttpStatus.NO_CONTENT,
      };
    } catch (e) {}

    return result;
  }
}
