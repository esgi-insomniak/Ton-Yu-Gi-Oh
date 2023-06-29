import { Injectable } from '@nestjs/common';
import { ProfilePicture } from 'src/entities/profilePicture.entity';
import {
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ProfilePictureService {
  private profilePictureRepository: Repository<ProfilePicture>;

  constructor(dataSource: DataSource) {
    this.profilePictureRepository = dataSource.getRepository(ProfilePicture);
  }

  async getProfilePrictures(query: QueryGetItems): Promise<ProfilePicture[]> {
    const profilePictures = await this.profilePictureRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return profilePictures;
  }

  async getProfilePictureById(
    params: ParamGetItemById,
  ): Promise<ProfilePicture> {
    const profilePicture = await this.profilePictureRepository.findOne({
      where: { id: params.id },
    });
    return profilePicture;
  }

  async createUserExchange(
    profilePicturePartial: DeepPartial<ProfilePicture>,
  ): Promise<ProfilePicture> {
    try {
      return await this.profilePictureRepository.save(profilePicturePartial);
    } catch {
      return null;
    }
  }
}
