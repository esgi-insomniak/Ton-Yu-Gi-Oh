import { Controller, Post, Inject, Body, Req } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseDto } from '../../interfaces/user-service/user/user.response.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { LoginUserBodyDto } from 'src/interfaces/user-service/user/user.body.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import {
  DefaultResponse,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { IUser } from 'src/interfaces/user-service/user/user.interface';
import { IToken } from 'src/interfaces/auth-service/token/token.interface';

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
}
