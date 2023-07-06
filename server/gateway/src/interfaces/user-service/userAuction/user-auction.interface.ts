export interface IAuction {
  id: string;
  userCardSetId: string;
  createdAt: Date;
  duration: number;
  minimalPrice: number;
  currentPrice: number;
  isClosed: boolean;
}
