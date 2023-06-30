import { ApiProperty } from '@nestjs/swagger';
import { IUserRelation } from './user-relation.interface';

export class GetUserRelationResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'a48eff2f-ee0d-4faf-9cef-f97c859e687b',
        isBlocked: true,
        relationOwner: {
          id: 'c1e183bf-8677-4b0b-8677-4f11eb2cc099',
          username: 'JohnDoe',
          email: 'johndoe@test.fr',
          phone: null,
          roles: ['user'],
          coins: 3367,
          isOnline: true,
          profilePicture: {
            id: 'a9012312-5ae9-4204-aa09-96fc13caa045',
            name: 'YuGi',
            path: 'yugi.png',
          },
        },
        targetUser: {
          id: 'a5e1629b-86e0-445a-97bc-d752f1027330',
          username: 'Loan',
          email: 'loan@test.fr',
          phone: null,
          roles: ['user'],
          coins: 0,
          isOnline: true,
          profilePicture: null,
        },
      },
    ],
  })
  data: IUserRelation[];
}

export class GetUserRelationByIdResponseDto {
  @ApiProperty({
    example: {
      id: 'a48eff2f-ee0d-4faf-9cef-f97c859e687b',
      isBlocked: true,
      relationOwner: {
        id: 'c1e183bf-8677-4b0b-8677-4f11eb2cc099',
        username: 'JohnDoe',
        email: 'johndoe@test.fr',
        phone: null,
        roles: ['user'],
        coins: 3367,
        isOnline: true,
        profilePicture: {
          id: 'a9012312-5ae9-4204-aa09-96fc13caa045',
          name: 'YuGi',
          path: 'yugi.png',
        },
      },
      targetUser: {
        id: 'a5e1629b-86e0-445a-97bc-d752f1027330',
        username: 'Loan',
        email: 'loan@test.fr',
        phone: null,
        roles: ['user'],
        coins: 0,
        isOnline: true,
        profilePicture: null,
      },
    },
  })
  data: IUserRelation;
}
