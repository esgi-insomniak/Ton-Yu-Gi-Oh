import { Module, forwardRef } from '@nestjs/common';
import { ArchetypeController } from 'src/controllers/cards/archetype.controller';
import { AttributeController } from 'src/controllers/cards/attribute.controller';
import { AppModule } from './app.module';
import { CardSetController } from 'src/controllers/cards/card-set.controller';
import { FrameTypeController } from 'src/controllers/cards/frame-type.controller';
import { LinkMarkerController } from 'src/controllers/cards/link-marker.controller';
import { CardPriceController } from 'src/controllers/cards/card-price.controller';
import { RaceController } from 'src/controllers/cards/race.controller';
import { RarityController } from 'src/controllers/cards/rarity.controller';
import { SetController } from 'src/controllers/cards/set.controller';
import { TypeController } from 'src/controllers/cards/type.controller';
import {
  UserCardSetController,
  UserController,
} from 'src/controllers/cards/user-card-set.controller';
import { UserDeckController } from 'src/controllers/cards/user-deck.controller';
import { UserSetController } from 'src/controllers/cards/user-set-controller';
import { CardController } from 'src/controllers/cards/card.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [
    ArchetypeController,
    AttributeController,
    CardSetController,
    CardController,
    FrameTypeController,
    LinkMarkerController,
    CardPriceController,
    RaceController,
    RarityController,
    SetController,
    TypeController,
    UserCardSetController,
    UserController,
    UserDeckController,
    UserSetController,
  ],
})
export class CardModule {}
