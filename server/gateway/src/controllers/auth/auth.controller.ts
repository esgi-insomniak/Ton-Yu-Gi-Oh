import {
  Controller,
  Post,
  Inject,
  Body,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseDto } from '../../interfaces/user-service/user/user.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import {
  ConfirmAccountBodyDto,
  LoginUserBodyDto,
  ResetPasswordBodyDto,
  SendEmailBodyDto,
} from 'src/interfaces/user-service/user/user.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import {
  DefaultResponse,
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import {
  IUser,
  IUserRoles,
} from 'src/interfaces/user-service/user/user.interface';
import { IToken } from 'src/interfaces/auth-service/token/token.interface';
import { IBasicAuth } from 'src/interfaces/auth-service/auth/basic-auth.interface';
import {
  ILoginHistory,
  ILoginHistoryPartial,
} from 'src/interfaces/auth-service/loginHistory/login-history.interface';
import { IpAddress } from 'src/decorators/ipaddress.decorator';
import { GetLoginHistoriesResponseDto } from 'src/interfaces/auth-service/loginHistory/login-history.response.dto';
import { Permission } from 'src/decorators/permission.decorator';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  ) {}

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginUserResponseDto,
  })
  public async loginUser(
    @Body() body: LoginUserBodyDto,
    @IpAddress() ipAddress: string,
  ): Promise<LoginUserResponseDto> {
    const loginHistory: Partial<ILoginHistoryPartial> = {
      ipAddress,
      isSuccess: false,
    };

    // get user by credentials
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_credentials', {
        email: body.email,
        username: body.username,
        phone: body.phone,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      this.authServiceClient.emit('create_login_history', loginHistory);
      throw new HttpException(userResponse.message, userResponse.status);
    }

    loginHistory.userId = userResponse.item.id;

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
      this.authServiceClient.emit('create_login_history', loginHistory);
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
      this.authServiceClient.emit('create_login_history', loginHistory);
      throw new HttpException(
        getBasicAuthTokensResponse.message,
        getBasicAuthTokensResponse.status,
      );
    }

    if (getBasicAuthTokensResponse.item.confirmationToken !== null) {
      this.authServiceClient.emit('create_login_history', loginHistory);
      throw new HttpException(
        'Confirm your account first',
        HttpStatus.UNAUTHORIZED,
      );
    }

    loginHistory.isSuccess = true;

    this.authServiceClient.emit('create_login_history', loginHistory);

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

  @Get('/login_histories')
  @Authorization(true)
  @Permission([IUserRoles.admin], true)
  @ApiOkResponse({
    type: GetLoginHistoriesResponseDto,
  })
  public async getLoginHistories(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetLoginHistoriesResponseDto> {
    const loginHistoriesResponse: GetResponseArray<ILoginHistoryPartial> =
      await firstValueFrom(
        this.authServiceClient.send('get_login_histories', query),
      );

    const userIds: string[] = loginHistoriesResponse.items
      .reduce((acc, curr) => {
        if (acc.indexOf(curr.userId) === -1) {
          acc.push(curr.userId);
        }
        return acc;
      }, [])
      .filter((userId) => userId !== null);

    const usersResponse: GetResponseArray<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_users_by_ids', {
        ids: userIds,
      }),
    );

    const loginHistories: ILoginHistory[] = loginHistoriesResponse.items.map(
      (loginHistory) => {
        const userId = loginHistory.userId;
        delete loginHistory.userId;
        return {
          ...loginHistory,
          user: usersResponse.items.find((user) => user.id === userId) || null,
        } as ILoginHistory;
      },
    );

    const result: GetLoginHistoriesResponseDto = {
      data: loginHistories,
    };

    return result;
  }

  @Post('send_confirmation_email')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  public async sendConfirmationEmail(
    @Body() body: SendEmailBodyDto,
  ): Promise<void> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_credentials', {
        email: body.email,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const basicAuthResponse: GetResponseOne<
      Pick<IBasicAuth, 'confirmationToken'>
    > = await firstValueFrom(
      this.authServiceClient.send('get_basic_auth_confirmation_token', {
        userId: userResponse.item.id,
      }),
    );

    if (basicAuthResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        basicAuthResponse.message,
        basicAuthResponse.status,
      );
    }

    if (basicAuthResponse.item.confirmationToken === null) {
      throw new HttpException('User already confirmed', HttpStatus.BAD_REQUEST);
    }

    // Send confirmation
    await firstValueFrom(
      this.mailerServiceClient.send('send_confirmation_email', {
        email: userResponse.item.email,
        username: userResponse.item.username,
        token: basicAuthResponse.item.confirmationToken,
      }),
    );
  }

  @Post('send_reset_password_email')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  public async sendResetPasswordEmail(
    @Body() body: SendEmailBodyDto,
  ): Promise<void> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_credentials', {
        email: body.email,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const basicAuthResponse: GetResponseOne<
      Pick<IBasicAuth, 'confirmationToken'>
    > = await firstValueFrom(
      this.authServiceClient.send('get_basic_auth_confirmation_token', {
        userId: userResponse.item.id,
      }),
    );

    if (basicAuthResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        basicAuthResponse.message,
        basicAuthResponse.status,
      );
    }

    if (basicAuthResponse.item.confirmationToken !== null) {
      throw new HttpException('User not confirmed', HttpStatus.BAD_REQUEST);
    }

    //generate_basic_auth_renew_token
    const basicAuthRenewTokenResponse: GetResponseOne<
      Pick<IBasicAuth, 'renewToken'>
    > = await firstValueFrom(
      this.authServiceClient.send('generate_basic_auth_renew_token', {
        userId: userResponse.item.id,
      }),
    );

    if (basicAuthRenewTokenResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        basicAuthRenewTokenResponse.message,
        basicAuthRenewTokenResponse.status,
      );
    }

    // Send reset password email
    await firstValueFrom(
      this.mailerServiceClient.send('send_password_reset_email', {
        email: userResponse.item.email,
        username: userResponse.item.username,
        token: basicAuthRenewTokenResponse.item.renewToken,
      }),
    );
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
