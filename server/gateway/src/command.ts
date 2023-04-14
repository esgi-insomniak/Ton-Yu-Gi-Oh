import { AppModuleCommand } from './modules/command.module';
import { CommandFactory } from 'nest-commander';
import { LogService } from './services/config/logger.service';

async function bootstrap() {
  await CommandFactory.run(AppModuleCommand, new LogService());
}
bootstrap();
