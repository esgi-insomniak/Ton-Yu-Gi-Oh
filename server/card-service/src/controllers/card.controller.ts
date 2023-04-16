import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from '../interfaces/common/common.response.interface';
import { CardService } from '../services/card.service';
import { DBFeederService } from 'src/services/dbFeeder.service';
import { Card } from 'src/entities/card.entity';
import { Archetype } from 'src/entities/archetype.entity';
import { Attribute } from 'src/entities/attribute.entity';
import { CardSet } from 'src/entities/cardSet.entity';
import { FrameType } from 'src/entities/frameType.entity';
import { LinkMarker } from 'src/entities/linkMarker.entity';
import { Price } from 'src/entities/price.entity';
import { Race } from 'src/entities/race.entity';
import { Rarity } from 'src/entities/rarity.entity';
import { Set } from 'src/entities/set.entity';
import { Type } from 'src/entities/type.entity';

@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly dbFeederService: DBFeederService,
  ) {}

  @MessagePattern('get_archetypes')
  public async getArchetypes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Archetype>> {
    const archetypes = await this.cardService.getArchetypes(query);
    const result: GetResponseArray<Archetype> = {
      status: HttpStatus.OK,
      items: archetypes,
    };

    return result;
  }

  @MessagePattern('get_archetype_by_id')
  public async getArchetypeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Archetype>> {
    const archetype = await this.cardService.getArchetypeById(params.id);
    const result: GetResponseOne<Archetype> = {
      status: archetype ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: archetype ? null : 'Archetype not found',
      item: archetype,
    };

    return result;
  }

  @MessagePattern('get_attributes')
  public async getAttributes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Attribute>> {
    const attributes = await this.cardService.getAttributes(query);
    const result: GetResponseArray<Attribute> = {
      status: HttpStatus.OK,
      items: attributes,
    };

    return result;
  }

  @MessagePattern('get_attribute_by_id')
  public async getAttributeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Attribute>> {
    const attribute = await this.cardService.getAttributeById(params.id);
    const result: GetResponseOne<Attribute> = {
      status: attribute ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: attribute ? null : 'Attribute not found',
      item: attribute,
    };

    return result;
  }

  @MessagePattern('get_cards')
  public async getCards(query: QueryGetItems): Promise<GetResponseArray<Card>> {
    const cards = await this.cardService.getCards(query);
    const result: GetResponseArray<Card> = {
      status: HttpStatus.OK,
      items: cards,
    };

    return result;
  }

  @MessagePattern('get_card_by_id')
  public async getCardById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Card>> {
    const card = await this.cardService.getCardById(params.id);
    const result: GetResponseOne<Card> = {
      status: card ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: card ? null : 'Card not found',
      item: card,
    };

    return result;
  }

  @MessagePattern('get_cardsets')
  public async getCardSets(
    query: QueryGetItems,
  ): Promise<GetResponseArray<CardSet>> {
    const cardSets = await this.cardService.getCardSets(query);
    const result: GetResponseArray<CardSet> = {
      status: HttpStatus.OK,
      items: cardSets,
    };

    return result;
  }

  @MessagePattern('get_cardset_by_id')
  public async getCardSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<CardSet>> {
    const cardSet = await this.cardService.getCardSetById(params.id);
    const result: GetResponseOne<CardSet> = {
      status: cardSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: cardSet ? null : 'CardSet not found',
      item: cardSet,
    };

    return result;
  }

  @MessagePattern('get_frametypes')
  public async getFrameTypes(
    query: QueryGetItems,
  ): Promise<GetResponseArray<FrameType>> {
    const frameTypes = await this.cardService.getFrameTypes(query);
    const result: GetResponseArray<FrameType> = {
      status: HttpStatus.OK,
      items: frameTypes,
    };

    return result;
  }

  @MessagePattern('get_frametype_by_id')
  public async getFrameTypeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<FrameType>> {
    const frameType = await this.cardService.getFrameTypeById(params.id);
    const result: GetResponseOne<FrameType> = {
      status: frameType ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: frameType ? null : 'FrameType not found',
      item: frameType,
    };

    return result;
  }

  @MessagePattern('get_linkmarkers')
  public async getLinkMarkers(
    query: QueryGetItems,
  ): Promise<GetResponseArray<LinkMarker>> {
    const linkMarkers = await this.cardService.getLinkMarkers(query);
    const result: GetResponseArray<LinkMarker> = {
      status: HttpStatus.OK,
      items: linkMarkers,
    };

    return result;
  }

  @MessagePattern('get_linkmarker_by_id')
  public async getLinkMarkerById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<LinkMarker>> {
    const linkMarker = await this.cardService.getLinkMarkerById(params.id);
    const result: GetResponseOne<LinkMarker> = {
      status: linkMarker ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: linkMarker ? null : 'LinkMarker not found',
      item: linkMarker,
    };

    return result;
  }

  @MessagePattern('get_prices')
  public async getPrices(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Price>> {
    const prices = await this.cardService.getPrices(query);
    const result: GetResponseArray<Price> = {
      status: HttpStatus.OK,
      items: prices,
    };

    return result;
  }

  @MessagePattern('get_price_by_id')
  public async getPriceById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Price>> {
    const price = await this.cardService.getPriceById(params.id);
    const result: GetResponseOne<Price> = {
      status: price ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: price ? null : 'Price not found',
      item: price,
    };

    return result;
  }

  @MessagePattern('get_races')
  public async getRaces(query: QueryGetItems): Promise<GetResponseArray<Race>> {
    const races = await this.cardService.getRaces(query);
    const result: GetResponseArray<Race> = {
      status: HttpStatus.OK,
      items: races,
    };

    return result;
  }

  @MessagePattern('get_race_by_id')
  public async getRaceById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Race>> {
    const race = await this.cardService.getRaceById(params.id);
    const result: GetResponseOne<Race> = {
      status: race ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: race ? null : 'Race not found',
      item: race,
    };

    return result;
  }

  @MessagePattern('get_rarities')
  public async getRarities(
    query: QueryGetItems,
  ): Promise<GetResponseArray<Rarity>> {
    const rarities = await this.cardService.getRarities(query);
    const result: GetResponseArray<Rarity> = {
      status: HttpStatus.OK,
      items: rarities,
    };

    return result;
  }

  @MessagePattern('get_rarity_by_id')
  public async getRarityById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Rarity>> {
    const rarity = await this.cardService.getRarityById(params.id);
    const result: GetResponseOne<Rarity> = {
      status: rarity ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: rarity ? null : 'Rarity not found',
      item: rarity,
    };

    return result;
  }

  @MessagePattern('get_sets')
  public async getSets(query: QueryGetItems): Promise<GetResponseArray<Set>> {
    const sets = await this.cardService.getSets(query);
    const result: GetResponseArray<Set> = {
      status: HttpStatus.OK,
      items: sets,
    };

    return result;
  }

  @MessagePattern('get_set_by_id')
  public async getSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Set>> {
    const set = await this.cardService.getSetById(params.id);
    const result: GetResponseOne<Set> = {
      status: set ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: set ? null : 'Set not found',
      item: set,
    };

    return result;
  }

  @MessagePattern('get_types')
  public async getTypes(query: QueryGetItems): Promise<GetResponseArray<Type>> {
    const types = await this.cardService.getTypes(query);
    const result: GetResponseArray<Type> = {
      status: HttpStatus.OK,
      items: types,
    };

    return result;
  }

  @MessagePattern('get_type_by_id')
  public async getTypeById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<Type>> {
    const type = await this.cardService.getTypeById(params.id);
    const result: GetResponseOne<Type> = {
      status: type ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: type ? null : 'Type not found',
      item: type,
    };

    return result;
  }

  @MessagePattern('feed_database')
  public async feedDatabase(params: { chunk: number }): Promise<string> {
    return await this.dbFeederService.feedDatabase(params.chunk);
  }
}
