import { SetMetadata } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Authorization = (secured: boolean) => {
  return applyDecorators(
    SetMetadata('secured', secured),
    ApiBearerAuth('defaultBearerAuth'),
  );
};
