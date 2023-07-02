import { AppModuleCommand } from './modules/command.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.run(AppModuleCommand);
}
bootstrap();
