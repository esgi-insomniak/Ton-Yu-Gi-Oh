import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { TestController } from 'src/controllers/test/test.controllers';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [TestController],
})
export class TestModule {}
