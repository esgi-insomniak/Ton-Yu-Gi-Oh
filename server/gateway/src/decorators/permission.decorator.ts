import { SetMetadata } from '@nestjs/common';

export const Permission = (roles: string[], areAuthorized = true) =>
  SetMetadata('permission', { roles, areAuthorized });
