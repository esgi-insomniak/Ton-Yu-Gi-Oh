import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DBFeederService } from 'src/services/db-feeder.service';

@Controller('default')
export class DBFeederController {
  constructor(private readonly dbFeederService: DBFeederService) {}

  @MessagePattern('feed_database')
  public async feedDatabase(params: { chunk: number }): Promise<string> {
    return await this.dbFeederService.feedDatabase(params.chunk);
  }
}
