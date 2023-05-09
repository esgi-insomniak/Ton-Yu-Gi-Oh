import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { WebsocketGateway } from '../websocket.gateway';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
