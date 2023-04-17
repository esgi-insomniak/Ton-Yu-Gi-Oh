import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './user.interface';

export class GetUsersResponseDto {
  @ApiProperty({
    example: [
      {
        id: '9249ed40-1826-4a1f-bdaf-bfe49b96e1fe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.fr',
        phone: '0123456789',
        coins: 10,
      },
    ],
  })
  data: IUser[];
}

export class GetUserByIdResponseDto {
  @ApiProperty({
    example: {
      id: '9249ed40-1826-4a1f-bdaf-bfe49b96e1fe',
      username: 'johndoe',
      email: 'john.doe@test.fr',
      phone: '0123456789',
      coins: 10,
      roles: ['user'],
    },
  })
  data: IUser;
}

export class CreateUserResponseDto {
  @ApiProperty({
    example: {
      id: '9249ed40-1826-4a1f-bdaf-bfe49b96e1fe',
      username: 'johndoe',
      email: 'john.doe@test.fr',
      phone: '0123456789',
      coins: 0,
      roles: ['user'],
    },
  })
  data: IUser;
}

export class LoginUserResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token: string;
}
