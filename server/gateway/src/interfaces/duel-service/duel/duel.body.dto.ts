import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class DuelSendActionDataBodyDto {
  @IsNotEmpty()
  @IsUUID(4)
  roomId: string;

  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(5)
  cardsInField: { position: number; cardId: string; action: string }[];
}
