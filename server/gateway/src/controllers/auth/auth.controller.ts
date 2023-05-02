import { Controller, Post, Inject, Body, Req, Param } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseDto } from '../../interfaces/user-service/user/user.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import {
  ConfirmAccountBodyDto,
  LoginUserBodyDto,
  ResetPasswordBodyDto,
} from 'src/interfaces/user-service/user/user.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import {
  DefaultResponse,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { IUser } from 'src/interfaces/user-service/user/user.interface';
import { IToken } from 'src/interfaces/auth-service/token/token.interface';
import { IBasicAuth } from 'src/interfaces/auth-service/auth/basic-auth.interface';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginUserResponseDto,
  })
  public async loginUser(
    @Body() body: LoginUserBodyDto,
  ): Promise<LoginUserResponseDto> {
    // get user by credentials
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_credentials', {
        email: body.email,
        username: body.username,
        phone: body.phone,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    // check if password is correct
    const tokenResponse: GetResponseOne<IToken> = await firstValueFrom(
      this.authServiceClient.send('compare_user_password', {
        userId: userResponse.item.id,
        username: userResponse.item.username,
        email: userResponse.item.email,
        roles: userResponse.item.roles,
        password: body.password,
      }),
    );

    if (tokenResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(tokenResponse.message, tokenResponse.status);
    }

    // check if user account is confirmed
    const getBasicAuthTokensResponse: GetResponseOne<
      Pick<IBasicAuth, 'confirmationToken'>
    > = await firstValueFrom(
      this.authServiceClient.send('get_basic_auth_confirmation_token', {
        userId: userResponse.item.id,
      }),
    );

    if (getBasicAuthTokensResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getBasicAuthTokensResponse.message,
        getBasicAuthTokensResponse.status,
      );
    }

    if (getBasicAuthTokensResponse.item.confirmationToken !== null) {
      throw new HttpException(
        'Confirm your account first',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const result: LoginUserResponseDto = {
      token: tokenResponse.item.token,
    };

    return result;
  }

  @Post('/logout')
  @Authorization(true)
  @ApiCreatedResponse({
    status: HttpStatus.NO_CONTENT,
  })
  public async logoutUser(@Req() request: IAuthorizedRequest): Promise<void> {
    const userInfo = request.user;

    const destroyTokenResponse: DefaultResponse = await firstValueFrom(
      this.authServiceClient.send('token_destroy', {
        userId: userInfo.id,
      }),
    );

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        destroyTokenResponse.message,
        destroyTokenResponse.status,
      );
    }

    return;
  }

  @Post('confirm_account')
  @ApiCreatedResponse({
    status: HttpStatus.NO_CONTENT,
  })
  public async confirmAccount(
    @Body() body: ConfirmAccountBodyDto,
  ): Promise<void> {
    const basicAuthResponse: DefaultResponse = await firstValueFrom(
      this.authServiceClient.send('confirm_basic_auth_account', {
        confirmationToken: body.confirmationToken,
      }),
    );

    if (basicAuthResponse.status !== HttpStatus.NO_CONTENT) {
      throw new HttpException(
        basicAuthResponse.message,
        basicAuthResponse.status,
      );
    }
  }

  @Post('reset_password')
  @ApiCreatedResponse({
    status: HttpStatus.NO_CONTENT,
  })
  public async resetPassword(
    @Body() body: ResetPasswordBodyDto,
  ): Promise<void> {
    const basicAuthResponse: DefaultResponse = await firstValueFrom(
      this.authServiceClient.send('reset_basic_auth_password', {
        renewToken: body.renewToken,
        password: body.password,
      }),
    );

    if (basicAuthResponse.status !== HttpStatus.NO_CONTENT) {
      throw new HttpException(
        basicAuthResponse.message,
        basicAuthResponse.status,
      );
    }
  }
}
