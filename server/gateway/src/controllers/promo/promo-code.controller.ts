import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetItemsPaginationDto } from 'src/interfaces/common/common.query.dto';
import { GetItemByIdDto } from 'src/interfaces/common/common.params.dto';
import {
  GetPromoCodeByIdResponseDto,
  GetPromoCodesResponseDto,
} from 'src/interfaces/promo-service/promoCode/promo-code.response.dto';
import {
  GetResponseArray,
  GetResponseOne,
} from 'src/interfaces/common/common.response';
import {
  IPromoCode,
  IPromoCodePartial,
} from 'src/interfaces/promo-service/promoCode/promo-code.interface';
import {
  CreatePromoCodeBodyDto,
  UpdatePromoCodeBodyDto,
} from 'src/interfaces/promo-service/promoCode/promo-code.body.dto';
import { ICardSet } from 'src/interfaces/card-service/set/set.interface';
import { Authorization } from 'src/decorators/authorization.decorator';
import { Permission } from 'src/decorators/permission.decorator';
import { IUserRoles } from 'src/interfaces/user-service/user/user.interface';
import { GetItemByCodeDto } from 'src/interfaces/promo-service/promoCode/promo-code.params.dto';
import { IAuthorizedRequest } from 'src/interfaces/common/common.request';
import { IClaimedPromoCode } from 'src/interfaces/promo-service/claimedPromoCode/claimed-promo-code.interface';

@Controller('promo_codes')
@ApiTags('PromoCodes')
export class PromoCodeController {
  constructor(
    @Inject('PROMO_SERVICE') private readonly promoServiceClient: ClientProxy,
    @Inject('CARD_SERVICE') private readonly cardServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('USER_DECK_SERVICE')
    private readonly userDeckServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Permission([IUserRoles.admin])
  @Get()
  @ApiOkResponse({
    type: GetPromoCodesResponseDto,
  })
  public async getPromoCodes(
    @Query() query: GetItemsPaginationDto,
  ): Promise<GetPromoCodesResponseDto> {
    const promoCodesResponse: GetResponseArray<IPromoCodePartial> =
      await firstValueFrom(
        this.promoServiceClient.send('get_promo_codes', {
          limit: query.limit,
          offset: query.offset,
        }),
      );

    if (promoCodesResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        promoCodesResponse.message,
        promoCodesResponse.status,
      );
    }

    const getSetByIdsResponse: GetResponseArray<ICardSet> =
      await firstValueFrom(
        this.cardServiceClient.send('get_sets_by_ids', {
          ids: promoCodesResponse.items
            .filter((promoCode) => promoCode.rewardSetId !== null)
            .map((promoCode) => promoCode.rewardSetId),
        }),
      );

    if (getSetByIdsResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getSetByIdsResponse.message,
        getSetByIdsResponse.status,
      );
    }

    const promoCodesWithSets: IPromoCode[] = promoCodesResponse.items.map(
      (promoCode) => {
        const rewardSetId = promoCode.rewardSetId;
        delete promoCode.rewardSetId;

        const promoCodeWithSet: IPromoCode = {
          ...promoCode,
          rewardSet:
            getSetByIdsResponse.items.find((set) => set.id === rewardSetId) ||
            null,
        };

        return promoCodeWithSet;
      },
    );

    const result: GetPromoCodesResponseDto = {
      data: promoCodesWithSets,
    };

    return result;
  }

  @Authorization(true)
  @Get(':id')
  @ApiOkResponse({
    type: GetPromoCodeByIdResponseDto,
  })
  public async getPromoCodeById(
    @Param() params: GetItemByIdDto,
  ): Promise<GetPromoCodeByIdResponseDto> {
    const promoCodeResponse: GetResponseOne<IPromoCodePartial> =
      await firstValueFrom(
        this.promoServiceClient.send('get_promo_code_by_id', {
          id: params.id,
        }),
      );

    if (promoCodeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        promoCodeResponse.message,
        promoCodeResponse.status,
      );
    }

    const getSetByIdResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets_by_ids', {
        ids: [promoCodeResponse.item.rewardSetId],
      }),
    );

    if (getSetByIdResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getSetByIdResponse.message,
        getSetByIdResponse.status,
      );
    }

    const rewardSetId = promoCodeResponse.item.rewardSetId;
    delete promoCodeResponse.item.rewardSetId;

    const promoCodeWithSet: IPromoCode = {
      ...promoCodeResponse.item,
      rewardSet:
        getSetByIdResponse.items.find((set) => set.id === rewardSetId) || null,
    };

    const result: GetPromoCodeByIdResponseDto = {
      data: promoCodeWithSet,
    };

    return result;
  }

  @Authorization(true)
  @Permission([IUserRoles.admin])
  @Post()
  @ApiCreatedResponse({
    type: GetPromoCodeByIdResponseDto,
  })
  public async createPromoCode(
    @Body() body: CreatePromoCodeBodyDto,
  ): Promise<GetPromoCodeByIdResponseDto> {
    const newPromoCode: Omit<IPromoCodePartial, 'id'> = body;

    if (newPromoCode.rewardSetId) {
      const getSetResponse: GetResponseOne<ICardSet> = await firstValueFrom(
        this.cardServiceClient.send('get_set_by_id', {
          id: newPromoCode.rewardSetId,
        }),
      );

      if (getSetResponse.status !== HttpStatus.OK) {
        throw new HttpException(getSetResponse.message, getSetResponse.status);
      }
    }

    const promoCodeResponse: GetResponseOne<IPromoCodePartial> =
      await firstValueFrom(
        this.promoServiceClient.send('create_promo_code', newPromoCode),
      );

    if (promoCodeResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        promoCodeResponse.message,
        promoCodeResponse.status,
      );
    }

    const getSetByIdResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets_by_ids', {
        ids: [promoCodeResponse.item.rewardSetId],
      }),
    );

    if (getSetByIdResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getSetByIdResponse.message,
        getSetByIdResponse.status,
      );
    }

    const rewardSetId = promoCodeResponse.item.rewardSetId;
    delete promoCodeResponse.item.rewardSetId;

    const promoCodeWithSet: IPromoCode = {
      ...promoCodeResponse.item,
      rewardSet:
        getSetByIdResponse.items.find((set) => set.id === rewardSetId) || null,
    };

    const result: GetPromoCodeByIdResponseDto = {
      data: promoCodeWithSet,
    };

    return result;
  }

  @Authorization(true)
  @Permission([IUserRoles.admin])
  @Patch(':id')
  @ApiOkResponse({
    type: GetPromoCodeByIdResponseDto,
  })
  public async updateRewardType(
    @Param() params: GetItemByIdDto,
    @Body() body: UpdatePromoCodeBodyDto,
  ): Promise<GetPromoCodeByIdResponseDto> {
    const updatedPromoCode: Omit<IPromoCodePartial, 'id'> = body;

    if (updatedPromoCode.rewardSetId) {
      const getSetResponse: GetResponseOne<ICardSet> = await firstValueFrom(
        this.cardServiceClient.send('get_set_by_id', {
          id: updatedPromoCode.rewardSetId,
        }),
      );

      if (getSetResponse.status !== HttpStatus.OK) {
        throw new HttpException(getSetResponse.message, getSetResponse.status);
      }
    }

    const getPromoCodeResponse: GetResponseOne<IPromoCodePartial> =
      await firstValueFrom(
        this.promoServiceClient.send('get_promo_code_by_id', {
          id: params.id,
        }),
      );

    if (getPromoCodeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getPromoCodeResponse.message,
        getPromoCodeResponse.status,
      );
    }

    const promoCodeResponse: GetResponseOne<IPromoCodePartial> =
      await firstValueFrom(
        this.promoServiceClient.send('update_promo_code_by_id', {
          params: {
            id: params.id,
          },
          body: updatedPromoCode,
        }),
      );

    if (promoCodeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        promoCodeResponse.message,
        promoCodeResponse.status,
      );
    }

    const getSetByIdResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets_by_ids', {
        ids: [promoCodeResponse.item.rewardSetId],
      }),
    );

    if (getSetByIdResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getSetByIdResponse.message,
        getSetByIdResponse.status,
      );
    }

    const rewardSetId = promoCodeResponse.item.rewardSetId;
    delete promoCodeResponse.item.rewardSetId;

    const promoCodeWithSet: IPromoCode = {
      ...promoCodeResponse.item,
      rewardSet:
        getSetByIdResponse.items.find((set) => set.id === rewardSetId) || null,
    };

    const result: GetPromoCodeByIdResponseDto = {
      data: promoCodeWithSet,
    };

    return result;
  }

  @Authorization(true)
  @Permission([IUserRoles.admin])
  @Delete(':id')
  @ApiOkResponse()
  public async deletePromoCodeById(
    @Param() params: GetItemByIdDto,
  ): Promise<void> {
    const getPromoCodeResponse: GetResponseOne<IPromoCode> =
      await firstValueFrom(
        this.promoServiceClient.send('get_promo_code_by_id', {
          id: params.id,
        }),
      );

    if (getPromoCodeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getPromoCodeResponse.message,
        getPromoCodeResponse.status,
      );
    }

    const deletePromoCOdeResponse: GetResponseOne<IPromoCode> =
      await firstValueFrom(
        this.promoServiceClient.send('delete_promo_code_by_id', {
          id: params.id,
        }),
      );

    if (deletePromoCOdeResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        deletePromoCOdeResponse.message,
        deletePromoCOdeResponse.status,
      );
    }

    return;
  }

  @Authorization(true)
  @Post(':code/redeem')
  @ApiOkResponse({
    type: GetPromoCodeByIdResponseDto,
  })
  public async redeemPromoCode(
    @Param() params: GetItemByCodeDto,
    @Req() request: IAuthorizedRequest,
  ) {
    const getPromoCodeByCodeResponse: GetResponseOne<IPromoCodePartial> =
      await firstValueFrom(
        this.promoServiceClient.send('get_promo_code_by_code', {
          code: params.code,
        }),
      );

    const promoCode = getPromoCodeByCodeResponse.item;

    if (
      getPromoCodeByCodeResponse.status !== HttpStatus.OK ||
      (promoCode.expirationDate !== null &&
        new Date(promoCode.expirationDate) < new Date())
    ) {
      throw new HttpException(
        'Promo code not found or expired',
        getPromoCodeByCodeResponse.status,
      );
    }

    const createClaimedPromoCodeResponse: GetResponseOne<IClaimedPromoCode> =
      await firstValueFrom(
        this.promoServiceClient.send('create_claimed_promo_code', {
          userId: request.user.id,
          promoCode: promoCode.id,
        }),
      );

    if (createClaimedPromoCodeResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        'Promo code already redeemed',
        createClaimedPromoCodeResponse.status,
      );
    }

    // add reward to user
    if (
      promoCode.rewardCoinsAmount !== null &&
      promoCode.rewardCoinsAmount > 0
    ) {
      await firstValueFrom(
        this.userServiceClient.send('add_coins_user', {
          userId: request.user.id,
          coins: promoCode.rewardCoinsAmount,
        }),
      );
    }

    // create user sets
    if (
      promoCode.rewardSetId !== null &&
      promoCode.rewardSetAmount !== null &&
      promoCode.rewardSetAmount > 0
    ) {
      await firstValueFrom(
        this.userDeckServiceClient.send('create_usersets', {
          userId: request.user.id,
          setId: promoCode.rewardSetId,
          amount: promoCode.rewardSetAmount,
        }),
      );
    }

    const getSetByIdResponse: GetResponseArray<ICardSet> = await firstValueFrom(
      this.cardServiceClient.send('get_sets_by_ids', {
        ids: [promoCode.rewardSetId],
      }),
    );

    if (getSetByIdResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        getSetByIdResponse.message,
        getSetByIdResponse.status,
      );
    }

    const rewardSetId = promoCode.rewardSetId;
    delete promoCode.rewardSetId;

    const promoCodeWithSet: IPromoCode = {
      ...promoCode,
      rewardSet:
        getSetByIdResponse.items.find((set) => set.id === rewardSetId) || null,
    };

    const result: GetPromoCodeByIdResponseDto = {
      data: promoCodeWithSet,
    };

    return result;
  }
}
