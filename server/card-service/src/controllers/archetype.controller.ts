import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Archetype } from 'src/entities/archetype.entity';
import { ArchetypeService } from 'src/services/archetype.service';

@Controller('archetype')
export class ArchetypeController {
  constructor(private readonly archetypeService: ArchetypeService) {}

  @MessagePattern('get_archetypes')
  public async getArchetypes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Archetype>> {
    const archetypes = await this.archetypeService.getArchetypes(query);
    const result: GetResponseArray<Archetype> = {
      status: HttpStatus.OK,
      items: archetypes,
    };

    return result;
  }

  @MessagePattern('get_archetype_by_id')
  public async getArchetypeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Archetype>> {
    const archetype = await this.archetypeService.getArchetypeById(params.id);
    const result: GetResponseOne<Archetype> = {
      status: archetype ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: archetype ? null : 'Archetype not found',
      item: archetype,
    };

    return result;
  }
}
