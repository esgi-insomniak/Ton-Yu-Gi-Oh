import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsMobilePhone()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class UpdateUserBodyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMobilePhone()
  phone: string;

  @ApiProperty({
    type: [String],
    items: { type: 'string', format: 'uuid' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  roles: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  coins: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID(4)
  profilePicture: string;
}

export class LoginUserBodyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMobilePhone()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
}

export class ConfirmAccountBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  confirmationToken: string;
}

export class ResetPasswordBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  renewToken: string;
}

export class SendEmailBodyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
