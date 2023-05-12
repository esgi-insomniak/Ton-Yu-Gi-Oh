import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { SetFiltersDto } from '../set/set.query.dto';
import { IntersectionType } from '@nestjs/swagger';
import { CardFiltersDto } from '../card/card.query.dto';
import { RarityFiltersDto } from '../rarity/rarity.query.dto';

export class GetCardSetsQuery extends IntersectionType(
  IntersectionType(GetItemsPaginationDto, SetFiltersDto),
  IntersectionType(CardFiltersDto, RarityFiltersDto),
) {}
