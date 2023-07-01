import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { SetFiltersDto } from 'src/interfaces/card-service/set/set.query.dto';
import { CardFiltersDto } from 'src/interfaces/card-service/card/card.query.dto';
import { RarityFiltersDto } from 'src/interfaces/card-service/rarity/rarity.query.dto';
import { IsOptional, IsUUID } from 'class-validator';
export class GetUserCardSetsQuery extends IntersectionType(
  IntersectionType(GetItemsPaginationDto, SetFiltersDto),
  IntersectionType(CardFiltersDto, RarityFiltersDto),
) {}

export class GetUserCardSetByIdQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  cardSetId: string;
}
