import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserExchangeBodyDto {
  @IsNotEmpty()
  @IsUUID(4)
  userId: string;

  @IsNotEmpty()
  @IsUUID(4)
  cardSetId: string;
}

export class AcceptUserExchangeByIdDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @IsBoolean()
  @IsOptional()
  accept: boolean;
}

export class UpdateUserExchangeByIdDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayUnique()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @IsOptional()
  ownerCardSetsProposed: string[];
}
