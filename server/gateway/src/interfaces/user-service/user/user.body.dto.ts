import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
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
