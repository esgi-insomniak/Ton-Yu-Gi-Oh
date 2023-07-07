import { userSchemaType } from "@/helpers/utils/schema/Admin";

export interface IAuction {
  id: string;
  cardSetId: string;
  createdAt: Date;
  duration: number;
  currentPrice: number;
  isClosed: boolean;
  winner?: userSchemaType;
}

export interface IAuctionHistory {
  id: string;
  user: userSchemaType;
  auction?: IAuction;
  price: number;
  createdAt: Date;
}