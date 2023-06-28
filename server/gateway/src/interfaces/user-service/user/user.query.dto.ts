import { IntersectionType } from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { GetUserCardSetByIdQueryDto } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.query.dto';

export class GetUsersQuery extends IntersectionType(
  GetUserCardSetByIdQueryDto,
  GetItemsPaginationDto,
) {}
