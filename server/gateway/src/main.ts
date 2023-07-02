import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { ConfigService } from './services/config/config.service';
import { SocketIoAdapter } from './socket-io-adapter';
import helmet from 'helmet';
import * as compression from 'compression';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe(),
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(compression());
  app.use(helmet());
  app.use(requestIp.mw());
  app.enableCors({ origin: [new ConfigService().get('corsOrigin')] });
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
