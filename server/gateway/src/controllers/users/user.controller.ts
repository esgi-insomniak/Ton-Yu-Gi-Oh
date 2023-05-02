import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserResponseDto,
  GetUserByIdResponseDto,
  GetUsersResponseDto,
} from '../../interfaces/user-service/user/user.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserBodyDto } from 'src/interfaces/user-service/user/user.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { IUser } from 'src/interfaces/user-service/user/user.interface';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import { Permission } from 'src/decorators/permission.decorator';
import { IBasicAuth } from 'src/interfaces/auth-service/auth/basic-auth.interface';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @Permission(['admin'])
  @ApiCreatedResponse({
    type: GetUsersResponseDto,
  })
  public async getUsers(
    @Req() request: IAuthorizedRequest,
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetUsersResponseDto> {
    const userResponse: GetResponseArray<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_users', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const result: GetUsersResponseDto = {
      data: userResponse.items,
    };

    return result;
  }

  @Get(':id')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserByIdResponseDto,
  })
  public async getUserById(
    @Req() request: IAuthorizedRequest,
    @Param() params: GetItemByIdDto,
  ): Promise<GetUserByIdResponseDto> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
      }),
    );

    if (userResponse.status !== HttpStatus.OK) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const result: GetUserByIdResponseDto = {
      data: userResponse.item,
    };

    return result;
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  public async createUser(
    @Body() body: CreateUserBodyDto,
  ): Promise<CreateUserResponseDto> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('user_create', body),
    );

    if (userResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(userResponse.message, userResponse.status);
    }

    const basicAuthResponse: GetResponseOne<IBasicAuth> = await firstValueFrom(
      this.authServiceClient.send('create_basic_auth', {
        userId: userResponse.item.id,
        password: body.password,
      }),
    );

    if (basicAuthResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        basicAuthResponse.message,
        basicAuthResponse.status,
      );
    }

    // Send confirmation
    await firstValueFrom(
      this.mailerServiceClient.send('send_confirmation_email', {
        email: userResponse.item.email,
        username: userResponse.item.username,
        token: basicAuthResponse.item.confirmationToken,
      }),
    );

    const result: CreateUserResponseDto = {
      data: userResponse.item,
    };

    return result;
  }

  @Post(':id/send_confirmation_email')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  public async sendConfirmationEmail(
    @Param() params: GetItemByIdDto,
  ): Promise<void> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
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

  @Post(':id/send_reset_password_email')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  public async sendResetPasswordEmail(
    @Param() params: GetItemByIdDto,
  ): Promise<void> {
    const userResponse: GetResponseOne<IUser> = await firstValueFrom(
      this.userServiceClient.send('get_user_by_id', {
        id: params.id,
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
}
