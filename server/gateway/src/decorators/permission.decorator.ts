import { SetMetadata } from '@nestjs/common';
import { IUserRoles } from 'src/interfaces/user-service/user/user.interface';

export const Permission = (
  roles: [keyof typeof IUserRoles],
  areAuthorized = true,
) => SetMetadata('permission', { roles, areAuthorized });
