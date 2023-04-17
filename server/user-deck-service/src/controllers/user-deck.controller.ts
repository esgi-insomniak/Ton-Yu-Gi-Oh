import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserDeckService } from '../services/user-deck.service';
import {
  GetResponseArray,
  GetResponseOne,
  ParamGetItemById,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { UserCardSet } from 'src/entities/user-card-set.entity';
import { UserDeck } from 'src/entities/user-deck.entity';
import { UserSet } from 'src/entities/user-set.entity';

@Controller('user')
export class UserDeckController {
  constructor(private readonly userDeckService: UserDeckService) { }
  
  @MessagePattern('get_usercardsets')
  public async getUserCardSets(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserCardSet>> {
    const userCardSets = await this.userDeckService.getUserCardSets(query);
    const result: GetResponseArray<UserCardSet> = {
      status: HttpStatus.OK,
      items: userCardSets,
    };

    return result;
  }

  @MessagePattern('get_usercardset_by_id')
  public async getUserCardSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserCardSet>> {
    const userCardSet = await this.userDeckService.getUserCardSetById(params.id);
    const result: GetResponseOne<UserCardSet> = {
      status: userCardSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userCardSet ? null : 'UserCardSet not found',
      item: userCardSet,
    };

    return result;
  }

  @MessagePattern('get_userdecks')
  public async getUserDecks(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserCardSet>> {
    const userDecks = await this.userDeckService.getUserCardSets(query);
    const result: GetResponseArray<UserCardSet> = {
      status: HttpStatus.OK,
      items: userDecks,
    };

    return result;
  }

  @MessagePattern('get_userdeck_by_id')
  public async getUserDeckById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserDeck>> {
    const userDeck = await this.userDeckService.getUserDeckById(params.id);
    const result: GetResponseOne<UserDeck> = {
      status: userDeck ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userDeck ? null : 'UserDeck not found',
      item: userDeck,
    };

    return result;
  }

  @MessagePattern('get_usersets')
  public async getUserSets(
    query: QueryGetItems,
  ): Promise<GetResponseArray<UserSet>> {
    const userSets = await this.userDeckService.getUserSets(query);
    const result: GetResponseArray<UserSet> = {
      status: HttpStatus.OK,
      items: userSets,
    };

    return result;
  }

  @MessagePattern('get_userset_by_id')
  public async getUserSetById(
    params: ParamGetItemById,
  ): Promise<GetResponseOne<UserSet>> {
    const userSet = await this.userDeckService.getUserSetById(params.id);
    const result: GetResponseOne<UserSet> = {
      status: userSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userSet ? null : 'UserSet not found',
      item: userSet,
    };

    return result;
  }
}
