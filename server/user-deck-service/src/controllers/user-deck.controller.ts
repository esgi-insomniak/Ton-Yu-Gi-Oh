import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserDeckService } from '../services/user-deck.service';
import {
  DefaultResponse,
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
  constructor(private readonly userDeckService: UserDeckService) {}

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
    const userCardSet = await this.userDeckService.getUserCardSetById(
      params.id,
    );
    const result: GetResponseOne<UserCardSet> = {
      status: userCardSet ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userCardSet ? null : 'UserCardSet not found',
      item: userCardSet,
    };

    return result;
  }

  @MessagePattern('get_usercardsets_by_user_id')
  public async getUserCardSetsByUserId(request: {
    params: ParamGetItemById;
    query: QueryGetItems;
  }): Promise<GetResponseArray<UserCardSet>> {
    const userCardSets = await this.userDeckService.getUserCardSetsByUserId(
      request.params.id,
      request.query,
    );
    const result: GetResponseArray<UserCardSet> = {
      status: userCardSets ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userCardSets ? null : 'UserCardSets not found',
      items: userCardSets,
    };

    return result;
  }

  @MessagePattern('post_usercardset')
  public async postUserCardSet(query: {
    userId: string;
    cardSetId: string;
  }): Promise<GetResponseOne<UserCardSet>> {
    const userCardSet = await this.userDeckService.createUserCardSet(query);
    const result: GetResponseOne<UserCardSet> = {
      status: userCardSet ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: userCardSet ? null : 'UserCardSet not created',
      item: userCardSet,
    };

    return result;
  }

  @MessagePattern('delete_usercardset')
  public async deleteUserCardSet(params: ParamGetItemById) {
    const userCardSetIsDeleted =
      await this.userDeckService.deleteUserCardSetById(params.id);
    const result: DefaultResponse = {
      status: userCardSetIsDeleted
        ? HttpStatus.NO_CONTENT
        : HttpStatus.NOT_FOUND,
      message: userCardSetIsDeleted ? null : 'UserCardSet not found',
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

  @MessagePattern('post_userdeck')
  public async postUserDeck(query: {
    userId: string;
    cardSetIds: string[];
  }): Promise<GetResponseOne<UserDeck>> {
    const userDeck = await this.userDeckService.createUserDeck(query);
    const result: GetResponseOne<UserDeck> = {
      status: userDeck ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userDeck ? null : 'UserDeck not found',
      item: userDeck,
    };

    return result;
  }

  @MessagePattern('add_cardset_to_userdeck')
  public async addCardSetToUserDeck(query: {
    userId: string;
    deckId: string;
    cardSetIds: string[];
  }): Promise<GetResponseOne<UserDeck>> {
    const userDeck = await this.userDeckService.addCardSetsToDeck(query);
    const result: GetResponseOne<UserDeck> = {
      status: userDeck ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: userDeck ? null : 'UserDeck not found',
      item: userDeck,
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
