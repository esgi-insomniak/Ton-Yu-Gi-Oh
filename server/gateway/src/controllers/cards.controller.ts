import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetCardByIdResponseDto,
  GetCardsResponseDto,
} from '../interfaces/card-service/card/card.response.dto';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import { ICard } from 'src/interfaces/card-service/card/card.interface';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetCardArchetypeByIdResponseDto,
  GetCardArchetypesResponseDto,
} from 'src/interfaces/card-service/archetype/archetype.response.dto';
import { ICardArchetype } from 'src/interfaces/card-service/archetype/archetype.interface';
import {
  GetCardAttributeByIdResponseDto,
  GetCardAttributesResponseDto,
} from 'src/interfaces/card-service/attribute/attribute.response.dto';
import { ICardAttribute } from 'src/interfaces/card-service/attribute/attribute.interface';
import {
  GetCardCardSetByIdResponseDto,
  GetCardCardSetsResponseDto,
} from 'src/interfaces/card-service/cardSet/card-set.response.dto';
import { ICardCardSet } from 'src/interfaces/card-service/cardSet/card-set.interface';
import {
  GetCardFrameTypeByIdResponseDto,
  GetCardFrameTypesResponseDto,
} from 'src/interfaces/card-service/frameType/frame-type.response.dto';
import { ICardFrameType } from 'src/interfaces/card-service/frameType/frame-type.interface';
import {
  GetCardLinkMarkerByIdResponseDto,
  GetCardLinkMarkersResponseDto,
} from 'src/interfaces/card-service/linkMarker/link-marker.response.dto';
import { ICardLinkMarker } from 'src/interfaces/card-service/linkMarker/link-marker.interface';
import {
  GetCardPriceByIdResponseDto,
  GetCardPricesResponseDto,
} from 'src/interfaces/card-service/price/price.response.dto';
import { ICardPrice } from 'src/interfaces/card-service/price/price.interface';
import {
  GetCardRaceByIdResponseDto,
  GetCardRacesResponseDto,
} from 'src/interfaces/card-service/race/race.response.dto';
import { ICardRace } from 'src/interfaces/card-service/race/race.interface';
import {
  GetCardRaritiesResponseDto,
  GetCardRarityByIdResponseDto,
} from 'src/interfaces/card-service/rarity/rarity.response.dto';
import { ICardRarity } from 'src/interfaces/card-service/rarity/rarity.interface';
import {
  GetCardSetByIdResponseDto,
  GetCardSetsResponseDto,
} from 'src/interfaces/card-service/set/set.response.dto';
import { ICardSet } from 'src/interfaces/card-service/set/set.interface';
import {
  GetCardTypeByIdResponseDto,
  GetCardTypesResponseDto,
} from 'src/interfaces/card-service/type/type.response.dto';
import { ICardType } from 'src/interfaces/card-service/type/type.interface';

@Controller('cards')
@ApiTags('cards')
export class CardController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
  ) {}

  @Get('archetypes')
  @ApiOkResponse({
    type: GetCardArchetypesResponseDto,
  })
  public async getCardArchetypes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardArchetypesResponseDto> {
    const cardArchetypeResponse: GetResponseArray<ICardArchetype> =
      await firstValueFrom(
        this.cardServiceClient.send('get_archetypes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardArchetypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardArchetypeResponse.message,
        cardArchetypeResponse.status,
      );
    }

    const result: GetCardArchetypesResponseDto = {
      data: cardArchetypeResponse.items,
    };

    return result;
  }

  @Get('archetypes/:id')
  @ApiOkResponse({
    type: GetCardArchetypeByIdResponseDto,
  })
  public async cardArchetypeResponse(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardArchetypeByIdResponseDto> {
    const cardArchetypeResponse: GetResponseOne<ICardArchetype> =
      await firstValueFrom(
        this.cardServiceClient.send('get_archetype_by_id', {
          id: params.id,
        }),
      );

    if (cardArchetypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardArchetypeResponse.message,
        cardArchetypeResponse.status,
      );
    }

    const result: GetCardArchetypeByIdResponseDto = {
      data: cardArchetypeResponse.item,
    };

    if (cardArchetypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardArchetypeResponse.status);
    }

    return result;
  }

  @Get('attributes')
  @ApiOkResponse({
    type: GetCardAttributesResponseDto,
  })
  public async getCardAttributes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardAttributesResponseDto> {
    const cardAttributeResponse: GetResponseArray<ICardAttribute> =
      await firstValueFrom(
        this.cardServiceClient.send('get_attributes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardAttributeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardAttributeResponse.message,
        cardAttributeResponse.status,
      );
    }

    const result: GetCardAttributesResponseDto = {
      data: cardAttributeResponse.items,
    };

    return result;
  }

  @Get('attributes/:id')
  @ApiOkResponse({
    type: GetCardAttributeByIdResponseDto,
  })
  public async getCardAttributeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardAttributeByIdResponseDto> {
    const cardAttributeResponse: GetResponseOne<ICardAttribute> =
      await firstValueFrom(
        this.cardServiceClient.send('get_attribute_by_id', {
          id: params.id,
        }),
      );

    if (cardAttributeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardAttributeResponse.message,
        cardAttributeResponse.status,
      );
    }

    const result: GetCardAttributeByIdResponseDto = {
      data: cardAttributeResponse.item,
    };

    if (cardAttributeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardAttributeResponse.status);
    }

    return result;
  }

  @Get('card_sets')
  @ApiOkResponse({
    type: GetCardCardSetsResponseDto,
  })
  public async getCardCardSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardCardSetsResponseDto> {
    console.log(query);
    const cardCardSetResponse: GetResponseArray<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardsets', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardCardSetResponse.message,
        cardCardSetResponse.status,
      );
    }

    const result: GetCardCardSetsResponseDto = {
      data: cardCardSetResponse.items,
    };

    return result;
  }

  @Get('card_sets/:id')
  @ApiOkResponse({
    type: GetCardCardSetByIdResponseDto,
  })
  public async getCardCardSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardCardSetByIdResponseDto> {
    const cardCardSetResponse: GetResponseOne<ICardCardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_cardset_by_id', {
          id: params.id,
        }),
      );

    if (cardCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardCardSetResponse.message,
        cardCardSetResponse.status,
      );
    }

    const result: GetCardCardSetByIdResponseDto = {
      data: cardCardSetResponse.item,
    };

    if (cardCardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardCardSetResponse.status);
    }

    return result;
  }

  @Get('frame_types')
  @ApiOkResponse({
    type: GetCardFrameTypesResponseDto,
  })
  public async getCardFrameTypes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardFrameTypesResponseDto> {
    const cardFrameTypeResponse: GetResponseArray<ICardFrameType> =
      await firstValueFrom(
        this.cardServiceClient.send('get_frametypes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardFrameTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardFrameTypeResponse.message,
        cardFrameTypeResponse.status,
      );
    }

    const result: GetCardFrameTypesResponseDto = {
      data: cardFrameTypeResponse.items,
    };

    return result;
  }

  @Get('frame_types/:id')
  @ApiOkResponse({
    type: GetCardFrameTypeByIdResponseDto,
  })
  public async getCardFrameTypeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardFrameTypeByIdResponseDto> {
    const cardFrameTypeResponse: GetResponseOne<ICardFrameType> =
      await firstValueFrom(
        this.cardServiceClient.send('get_frametype_by_id', {
          id: params.id,
        }),
      );

    if (cardFrameTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardFrameTypeResponse.message,
        cardFrameTypeResponse.status,
      );
    }

    const result: GetCardFrameTypeByIdResponseDto = {
      data: cardFrameTypeResponse.item,
    };

    if (cardFrameTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardFrameTypeResponse.status);
    }

    return result;
  }

  @Get('link_markers')
  @ApiOkResponse({
    type: GetCardLinkMarkersResponseDto,
  })
  public async getCardLinkMarkers(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardLinkMarkersResponseDto> {
    const cardLinkMarkerResponse: GetResponseArray<ICardLinkMarker> =
      await firstValueFrom(
        this.cardServiceClient.send('get_linkmarkers', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardLinkMarkerResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardLinkMarkerResponse.message,
        cardLinkMarkerResponse.status,
      );
    }

    const result: GetCardLinkMarkersResponseDto = {
      data: cardLinkMarkerResponse.items,
    };

    return result;
  }

  @Get('link_markers/:id')
  @ApiOkResponse({
    type: GetCardLinkMarkerByIdResponseDto,
  })
  public async getCardLinkMarkerById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardLinkMarkerByIdResponseDto> {
    const cardLinkMarkerResponse: GetResponseOne<ICardLinkMarker> =
      await firstValueFrom(
        this.cardServiceClient.send('get_linkmarker_by_id', {
          id: params.id,
        }),
      );

    if (cardLinkMarkerResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardLinkMarkerResponse.message,
        cardLinkMarkerResponse.status,
      );
    }

    const result: GetCardLinkMarkerByIdResponseDto = {
      data: cardLinkMarkerResponse.item,
    };

    if (cardLinkMarkerResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardLinkMarkerResponse.status);
    }

    return result;
  }

  @Get('prices')
  @ApiOkResponse({
    type: GetCardPricesResponseDto,
  })
  public async getCardPrices(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardPricesResponseDto> {
    const cardPriceResponse: GetResponseArray<ICardPrice> =
      await firstValueFrom(
        this.cardServiceClient.send('get_prices', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardPriceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardPriceResponse.message,
        cardPriceResponse.status,
      );
    }

    const result: GetCardPricesResponseDto = {
      data: cardPriceResponse.items,
    };

    return result;
  }

  @Get('prices/:id')
  @ApiOkResponse({
    type: GetCardPriceByIdResponseDto,
  })
  public async getCardPriceById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardPriceByIdResponseDto> {
    const cardPriceResponse: GetResponseOne<ICardPrice> = await firstValueFrom(
      this.cardServiceClient.send('get_price_by_id', {
        id: params.id,
      }),
    );

    if (cardPriceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardPriceResponse.message,
        cardPriceResponse.status,
      );
    }

    const result: GetCardPriceByIdResponseDto = {
      data: cardPriceResponse.item,
    };

    if (cardPriceResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardPriceResponse.status);
    }

    return result;
  }

  @Get('races')
  @ApiOkResponse({
    type: GetCardRacesResponseDto,
  })
  public async getCardRaces(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardRacesResponseDto> {
    const cardRaceResponse: GetResponseArray<ICardRace> = await firstValueFrom(
      this.cardServiceClient.send('get_races', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardRaceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRaceResponse.message,
        cardRaceResponse.status,
      );
    }

    const result: GetCardRacesResponseDto = {
      data: cardRaceResponse.items,
    };

    return result;
  }

  @Get('races/:id')
  @ApiOkResponse({
    type: GetCardRaceByIdResponseDto,
  })
  public async getCardRaceById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardRaceByIdResponseDto> {
    const cardRaceResponse: GetResponseOne<ICardRace> = await firstValueFrom(
      this.cardServiceClient.send('get_race_by_id', {
        id: params.id,
      }),
    );

    if (cardRaceResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRaceResponse.message,
        cardRaceResponse.status,
      );
    }

    const result: GetCardRaceByIdResponseDto = {
      data: cardRaceResponse.item,
    };

    if (cardRaceResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardRaceResponse.status);
    }

    return result;
  }

  @Get('rarities')
  @ApiOkResponse({
    type: GetCardRaritiesResponseDto,
  })
  public async getCardRarities(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardRaritiesResponseDto> {
    const cardRarityResponse: GetResponseArray<ICardRarity> =
      await firstValueFrom(
        this.cardServiceClient.send('get_rarities', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (cardRarityResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRarityResponse.message,
        cardRarityResponse.status,
      );
    }

    const result: GetCardRaritiesResponseDto = {
      data: cardRarityResponse.items,
    };

    return result;
  }

  @Get('rarities/:id')
  @ApiOkResponse({
    type: GetCardRarityByIdResponseDto,
  })
  public async getCardRarityById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardRarityByIdResponseDto> {
    const cardRarityResponse: GetResponseOne<ICardRarity> =
      await firstValueFrom(
        this.cardServiceClient.send('get_rarity_by_id', {
          id: params.id,
        }),
      );

    if (cardRarityResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardRarityResponse.message,
        cardRarityResponse.status,
      );
    }

    const result: GetCardRarityByIdResponseDto = {
      data: cardRarityResponse.item,
    };

    if (cardRarityResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardRarityResponse.status);
    }

    return result;
  }

  @Get('sets')
  @ApiOkResponse({
    type: GetCardSetsResponseDto,
  })
  public async getCardSets(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardSetsResponseDto> {
    const cardSetResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    const result: GetCardSetsResponseDto = {
      data: cardSetResponse.items,
    };

    return result;
  }

  @Get('sets/:id')
  @ApiOkResponse({
    type: GetCardSetByIdResponseDto,
  })
  public async getCardSetById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardSetByIdResponseDto> {
    const cardSetResponse: GetResponseOne<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_set_by_id', {
        id: params.id,
      }),
    );

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardSetResponse.message, cardSetResponse.status);
    }

    const result: GetCardSetByIdResponseDto = {
      data: cardSetResponse.item,
    };

    if (cardSetResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardSetResponse.status);
    }

    return result;
  }

  @Get('types')
  @ApiOkResponse({
    type: GetCardTypesResponseDto,
  })
  public async getCardTypes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardTypesResponseDto> {
    const cardTypeResponse: GetResponseArray<ICardType> = await firstValueFrom(
      this.cardServiceClient.send('get_types', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardTypeResponse.message,
        cardTypeResponse.status,
      );
    }

    const result: GetCardTypesResponseDto = {
      data: cardTypeResponse.items,
    };

    return result;
  }

  @Get('types/:id')
  @ApiOkResponse({
    type: GetCardTypeByIdResponseDto,
  })
  public async getCardTypeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardTypeByIdResponseDto> {
    const cardTypeResponse: GetResponseOne<ICardType> = await firstValueFrom(
      this.cardServiceClient.send('get_type_by_id', {
        id: params.id,
      }),
    );

    if (cardTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        cardTypeResponse.message,
        cardTypeResponse.status,
      );
    }

    const result: GetCardTypeByIdResponseDto = {
      data: cardTypeResponse.item,
    };

    if (cardTypeResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardTypeResponse.status);
    }

    return result;
  }

  @Get('')
  @ApiOkResponse({
    type: GetCardsResponseDto,
  })
  public async getCards(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetCardsResponseDto> {
    const cardResponse: GetResponseArray<ICard> = await firstValueFrom(
      this.cardServiceClient.send('get_cards', {
        limit: query.limit,
        offset: query.offset,
      }),
    );

    if (cardResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardResponse.message, cardResponse.status);
    }

    const result: GetCardsResponseDto = {
      data: cardResponse.items,
    };

    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetCardByIdResponseDto,
  })
  public async getCardById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetCardByIdResponseDto> {
    console.log(params);
    const cardResponse: GetResponseOne<ICard> = await firstValueFrom(
      this.cardServiceClient.send('get_card_by_id', {
        id: params.id,
      }),
    );

    if (cardResponse.status !== HttpStatus.OK) {
      throw new HttpException(cardResponse.message, cardResponse.status);
    }

    const result: GetCardByIdResponseDto = {
      data: cardResponse.item,
    };

    if (cardResponse.status !== HttpStatus.OK) {
      throw new HttpException(result, cardResponse.status);
    }

    return result;
  }
}
