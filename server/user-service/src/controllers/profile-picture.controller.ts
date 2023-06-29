import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProfilePicture } from 'src/entities/profilePicture.entity';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { ProfilePictureService } from 'src/services/profile-picture.service';
import { DeepPartial } from 'typeorm';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @MessagePattern('get_profile_pictures')
  public async getProfilePictures(
    query: QueryGetItems,
  ): Promise<GetResponseArray<ProfilePicture>> {
    const profilePictures =
      await this.profilePictureService.getProfilePrictures(query);
    const result: GetResponseArray<ProfilePicture> = {
      status: HttpStatus.OK,
      items: profilePictures,
    };

    return result;
  }

  @MessagePattern('get_profile_picture_by_id')
  public async getProfilePictureById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<ProfilePicture>> {
    const profilePicture =
      await this.profilePictureService.getProfilePictureById(params);
    const result: GetResponseOne<ProfilePicture> = {
      status: profilePicture ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: profilePicture ? null : 'ProfilePicture not found',
      item: profilePicture,
    };

    return result;
  }

  @MessagePattern('create_profile_picture')
  public async createProfilePicture(
    body: DeepPartial<ProfilePicture>,
  ): Promise<GetResponseOne<ProfilePicture>> {
    const profilePicture = await this.profilePictureService.createUserExchange(
      body,
    );
    const result: GetResponseOne<ProfilePicture> = {
      status: profilePicture ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: profilePicture ? null : 'ProfilePicture not created',
      item: profilePicture,
    };

    return result;
  }
}
