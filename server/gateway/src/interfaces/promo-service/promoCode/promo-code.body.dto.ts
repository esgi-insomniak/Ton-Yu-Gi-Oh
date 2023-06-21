import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreatePromoCodeBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  rewardCoinsAmount: number;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.rewardSetAmount !== undefined)
  @IsNotEmpty()
  @IsUUID(4)
  rewardSetId: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.rewardSetId !== undefined)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  rewardSetAmount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty()
  expirationDate: Date;
}

export class UpdatePromoCodeBodyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  rewardCoinsAmount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateIf((o, v) => o.rewardSetAmount !== undefined || v === null)
  @IsUUID(4)
  rewardSetId: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateIf((o) => o.rewardSetId !== undefined)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  rewardSetAmount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty()
  expirationDate: Date;
}
