import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from './app.module';
import { PromoCodeController } from 'src/controllers/promo/promo-code.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [PromoCodeController],
})
export class PromoModule {}
