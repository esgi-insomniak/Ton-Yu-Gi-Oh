import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
