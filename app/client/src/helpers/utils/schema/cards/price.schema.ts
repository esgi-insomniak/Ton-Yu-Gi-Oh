import * as zod from "zod";
import { cardPartialSchema } from "./card.schema";

export const priceSchema = zod.object({
  id: zod.string(),
  card: zod.lazy(() => cardPartialSchema),
  cardMarketPrice: zod.number(),
  tcgPlayerPrice: zod.number(),
  ebayPrice: zod.number(),
  amazonPrice: zod.number(),
  coolStuffIncPrice: zod.number(),
});

export const pricePartialSchema = zod.object({
  id: zod.string(),
  card: zod.string().optional(),
  cardMarketPrice: zod.number(),
  tcgPlayerPrice: zod.number(),
  ebayPrice: zod.number(),
  amazonPrice: zod.number(),
  coolStuffIncPrice: zod.number(),
});

export const priceOneResponseSchema = zod.object({
  data: priceSchema,
});

export const priceArrayResponseSchema = zod.object({
  data: priceSchema.array(),
});