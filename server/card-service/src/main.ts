import { NestFactory } from '@nestjs/core';
import { CardModule } from './modules/card.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { CommandFactory } from 'nest-commander';
import { CommandsModule } from './modules/commands.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CardModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);
  await CommandFactory.run(CommandsModule);
  await app.listen();
}
bootstrap();
