import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { Race } from 'src/entities/race.entity';
import { RaceService } from 'src/services/race.service';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @MessagePattern('get_races')
  public async getRaces(query: QueryGetItems): Promise<GetResponseArray<Race>> {
    const races = await this.raceService.getRaces(query);
    const result: GetResponseArray<Race> = {
      status: HttpStatus.OK,
      items: races,
    };

    return result;
  }

  @MessagePattern('get_race_by_id')
  public async getRaceById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Race>> {
    const race = await this.raceService.getRaceById(params.id);
    const result: GetResponseOne<Race> = {
      status: race ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: race ? null : 'Race not found',
      item: race,
    };

    return result;
  }
}
