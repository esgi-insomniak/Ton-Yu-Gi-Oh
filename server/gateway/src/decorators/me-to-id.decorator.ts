import { SetMetadata } from '@nestjs/common';

export const MeToId = (paramId = 'id') => SetMetadata('targetId', paramId);
