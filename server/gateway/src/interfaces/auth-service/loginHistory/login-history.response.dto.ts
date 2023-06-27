import { ApiProperty } from '@nestjs/swagger';
import { ILoginHistory } from './login-history.interface';

export class GetLoginHistoriesResponseDto {
  @ApiProperty({
    example: [
      {
        id: '0487fa31-ef59-4608-b125-d4c6ec707ee8',
        ipAddress: '::ffff:172.19.0.1',
        isSuccess: true,
        createdAt: '2023-06-26T15:47:15.859Z',
        user: {
          id: '10b6488d-3eba-4c1f-aaf9-bbb2364af35b',
          username: 'JohnDoe',
          email: 'johndoe@test.fr',
          phone: null,
          roles: ['user'],
          coins: 200,
          isOnline: false,
        },
      },
    ],
  })
  data: ILoginHistory[];
}
