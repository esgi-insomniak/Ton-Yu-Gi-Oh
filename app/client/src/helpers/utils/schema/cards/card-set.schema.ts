import * as zod from "zod";
import { cardSchema } from "./card.schema";
import { setPartialSchema, setSchema } from "./set.schema";
import { raritySchema } from "./rarity.schema";

export const cardSetSchema = zod.object({
  id: zod.string(),
  card: zod.lazy(() => cardSchema.omit({ cardSets: true })),
  set: zod.lazy(() => setPartialSchema),
  rarity: zod.lazy(() => raritySchema),
  price: zod.number(),
});

export const cardSetPartialSchema = zod.object({
  id: zod.string(),
  card: zod.string().optional(),
  set: zod.string().optional(),
  rarity: zod.string().optional(),
  price: zod.number(),
});

export const cardSetBuyableSchema = zod.object({
  id: zod.string().uuid(),
  userId: zod.string().uuid(),
  set: zod.object({
    id: zod.string().uuid(),
    name: zod.string(),
    code: zod.string(),
    image: zod.string(),
  }),
});

export const deckSchema = zod.object({
  id: zod.string(),
  card: cardSchema,
  set: zod.lazy(() => setSchema),
  price: zod.number(),
  rarity: raritySchema
})

export const arrayOfCardSetsSchema = zod.object({
  id: zod.string(),
  userId: zod.string(),
  cardSet: deckSchema
})

export const userCardSets = zod.object({
  id: zod.string(),
  userId: zod.string(),
  name: zod.string(),
  cardSets: zod.array(arrayOfCardSetsSchema)
})

export const cardSetOneResponseSchema = zod.object({
  data: cardSetSchema,
});

export const cardSetArrayResponseSchema = zod.object({
  data: cardSetSchema.array(),
});

export const userCardSetsResponseSchema = zod.object({
  data: userCardSets.array(),
})

export type userCardSetReponseType = zod.infer<typeof userCardSetsResponseSchema>;
export type userCardSetsType = zod.infer<typeof userCardSets>;
export type arrayOfCardSetsSchemaType = zod.infer<typeof arrayOfCardSetsSchema>;