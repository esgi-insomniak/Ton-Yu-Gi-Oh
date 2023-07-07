import { ArrayMaxSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { IUserCardSet } from 'src/interfaces/user-deck-service/userCardSet/user-card-set.interface';

export class DuelSendActionDataBodyDto {
  @IsNotEmpty()
  @IsUUID(4)
  roomId: string;

  @IsArray()
  @ArrayMaxSize(5)
  cardsInField: {
    position: number;
    userCardSet: IUserCardSet;
    action: string;
  }[];
}
