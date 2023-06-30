import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { Authorization } from 'src/decorators/authorization.decorator';
import { Permission } from 'src/decorators/permission.decorator';
import { IUserRoles } from 'src/interfaces/user-service/user/user.interface';
import {
  GetProfilePictureByIdResponseDto,
  GetProfilePicturesResponseDto,
} from 'src/interfaces/user-service/profilePicture/profile-picture.response.dto';
import { IProfilePicture } from 'src/interfaces/user-service/profilePicture/profile-picture.interface';
import { CreateProfilePictureBodyDto } from 'src/interfaces/user-service/profilePicture/profile-picture.body.dto';

@Controller('profile_pictures')
@ApiTags('ProfilePicture')
export class ProfilePictureController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Get()
  @ApiOkResponse({
    type: GetProfilePicturesResponseDto,
  })
  public async getProfilePictures(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetProfilePicturesResponseDto> {
    const profilePicturesResponse: GetResponseArray<IProfilePicture> =
      await firstValueFrom(
        this.userServiceClient.send('get_profile_pictures', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (profilePicturesResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        profilePicturesResponse.message,
        profilePicturesResponse.status,
      );
    }

    const result: GetProfilePicturesResponseDto = {
      data: profilePicturesResponse.items,
    };

    return result;
  }

  @Authorization(true)
  @Get(':id')
  @ApiOkResponse({
    type: GetProfilePictureByIdResponseDto,
  })
  public async getProfilePictureById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetProfilePictureByIdResponseDto> {
    const profilePictureResponse: GetResponseOne<IProfilePicture> =
      await firstValueFrom(
        this.userServiceClient.send('get_profile_picture_by_id', {
          id: params.id,
        }),
      );

    if (profilePictureResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        profilePictureResponse.message,
        profilePictureResponse.status,
      );
    }

    const result: GetProfilePictureByIdResponseDto = {
      data: profilePictureResponse.item,
    };

    return result;
  }

  @Authorization(true)
  @Permission([IUserRoles.admin])
  @Post()
  @ApiCreatedResponse({
    type: GetProfilePictureByIdResponseDto,
  })
  public async createProfilePicture(
    @Body() body: CreateProfilePictureBodyDto,
  ): Promise<GetProfilePictureByIdResponseDto> {
    const newProfilePicture: Partial<IProfilePicture> = body;

    const profilePictureResponse: GetResponseOne<IProfilePicture> =
      await firstValueFrom(
        this.userServiceClient.send(
          'create_profile_picture',
          newProfilePicture,
        ),
      );

    if (profilePictureResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        profilePictureResponse.message,
        profilePictureResponse.status,
      );
    }

    const result: GetProfilePictureByIdResponseDto = {
      data: profilePictureResponse.item,
    };

    return result;
  }
}
