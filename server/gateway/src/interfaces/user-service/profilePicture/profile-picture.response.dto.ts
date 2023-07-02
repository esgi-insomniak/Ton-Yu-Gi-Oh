import { ApiProperty } from '@nestjs/swagger';
import { IProfilePicture } from './profile-picture.interface';

export class GetProfilePicturesResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'a9012312-5ae9-4204-aa09-96fc13caa045',
        name: 'YuGi',
        path: 'yugi.png',
      },
    ],
  })
  data: IProfilePicture[];
}

export class GetProfilePictureByIdResponseDto {
  @ApiProperty({
    example: {
      id: 'a9012312-5ae9-4204-aa09-96fc13caa045',
      name: 'YuGi',
      path: 'yugi.png',
    },
  })
  data: IProfilePicture;
}
