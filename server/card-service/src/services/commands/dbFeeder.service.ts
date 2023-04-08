import { Command, CommandRunner } from 'nest-commander';
import { CardService } from '../card.service';

@Command({ name: 'databaseFeeder', description: 'Feeds the database' })
export class DatabaseFeederCommand extends CommandRunner {
  constructor(private readonly cardService: CardService) {
    super();
  }

  async run(): Promise<void> {
    return console.log('Feeding the database...');
  }
}
