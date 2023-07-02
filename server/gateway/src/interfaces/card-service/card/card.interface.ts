import { ICardArchetype } from '../archetype/archetype.interface';
import { ICardAttribute } from '../attribute/attribute.interface';
import { ICardCardSet } from '../cardSet/card-set.interface';
import { ICardFrameType } from '../frameType/frame-type.interface';
import { ICardLinkMarker } from '../linkMarker/link-marker.interface';
import { ICardPrice } from '../price/price.interface';
import { ICardRace } from '../race/race.interface';
import { ICardType } from '../type/type.interface';

export interface ICard {
  id: string;
  identifiant: string;
  type: ICardType;
  frameType: ICardFrameType;
  race: ICardRace;
  archetype?: ICardArchetype;
  attribute?: ICardAttribute;
  price: ICardPrice;
  cardSets: ICardCardSet[];
  linkMarkers: ICardLinkMarker[];
  name: string;
  enName: string;
  description: string;
  atk?: number;
  def?: number;
  level?: number;
  scale?: number;
  linkVal?: number;
  imageUrl: string;
  imageSmallUrl: string;
}
