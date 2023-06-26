import { Module } from '@nestjs/common';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { ClaimedPromoCodeController } from 'src/controllers/claimed-promo-code.controller';
import { PromoCodeController } from 'src/controllers/promo-code.controller';
import { ClaimedPromoCodeService } from 'src/services/claimed-promo-code.service';
import { PromoCodeService } from 'src/services/promo.code.service';

@Module({
  imports: [PostgresModule],
  controllers: [ClaimedPromoCodeController, PromoCodeController],
  providers: [ClaimedPromoCodeService, PromoCodeService, ConfigService],
})
export class PromoModule {}
