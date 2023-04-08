import { Module } from '@nestjs/common';
import { DatabaseFeederCommand } from 'src/services/commands/dbFeeder.service';

@Module({
  providers: [DatabaseFeederCommand],
})
export class CommandsModule {}
