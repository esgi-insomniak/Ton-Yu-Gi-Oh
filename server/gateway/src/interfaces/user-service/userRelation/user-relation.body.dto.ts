import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateUserRelationBodyDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  isBlocked: boolean;

  @ApiProperty({ required: true })
  @IsUUID(4)
  targetUser: string;
}

export class UpdateUserRelationBodyDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  isBlocked: boolean;
}
