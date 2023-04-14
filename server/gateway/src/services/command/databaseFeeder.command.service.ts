import { Command, CommandRunner } from 'nest-commander';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LogService } from '../config/logger.service';

@Command({ name: 'feed-db', description: 'feed database' })
export class DatabaseFeederCommand extends CommandRunner {
  constructor(
    private readonly logService: LogService,
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {
    super();
  }

  async run(): Promise<void> {
    const cardDBFeedResponse = await firstValueFrom(
      this.cardServiceClient.send('feed_database', { chunk: 1000 }),
    );
    this.logService.log(cardDBFeedResponse);
    process.exit(0);
  }
}
