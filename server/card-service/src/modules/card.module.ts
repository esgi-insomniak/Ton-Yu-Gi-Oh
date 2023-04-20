import { Module } from '@nestjs/common';
import { CardController } from '../controllers/card.controller';
import { CardService } from '../services/card.service';
import { ConfigService } from '../services/config/config.service';
import { PostgresModule } from './postgres.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DBFeederService } from 'src/services/db-feeder.service';
import { ArchetypeController } from 'src/controllers/archetype.controller';
import { AttributeController } from 'src/controllers/attribute.controller';
import { CardPriceController } from 'src/controllers/card-price.controller';
import { CardSetController } from 'src/controllers/card-set.controller';
import { FrameTypeController } from 'src/controllers/frame-type.controller';
import { LinkMarkerController } from 'src/controllers/link-marker.controller';
import { RaceController } from 'src/controllers/race.controller';
import { RarityController } from 'src/controllers/rarity.controller';
import { SetController } from 'src/controllers/set.controller';
import { TypeController } from 'src/controllers/type.controller';
import { DBFeederController } from 'src/controllers/db-feeder.controller';
import { ArchetypeService } from 'src/services/archetype.service';
import { AttributeService } from 'src/services/attribute.service';
import { CardPriceService } from 'src/services/card-price.service';
import { CardSetService } from 'src/services/card-set.service';
import { FrameTypeService } from 'src/services/frame-type.service';
import { LinkMarkerService } from 'src/services/link-marker.service';
import { RaceService } from 'src/services/race.service';
import { RarityService } from 'src/services/rarity.service';
import { SetService } from 'src/services/set.service';
import { TypeService } from 'src/services/type.service';

@Module({
  imports: [PostgresModule, ScheduleModule.forRoot()],
  controllers: [
    ArchetypeController,
    AttributeController,
    CardPriceController,
    CardSetController,
    CardController,
    FrameTypeController,
    LinkMarkerController,
    RaceController,
    RarityController,
    SetController,
    TypeController,
    DBFeederController,
  ],
  providers: [
    ArchetypeService,
    AttributeService,
    CardPriceService,
    CardSetService,
    CardService,
    FrameTypeService,
    LinkMarkerService,
    RaceService,
    RarityService,
    SetService,
    TypeService,
    DBFeederService,
    ConfigService,
  ],
})
export class CardModule {}
