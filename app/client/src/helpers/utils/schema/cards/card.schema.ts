import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";
import { typeSchema } from "./type.schema";
import { frameTypeSchema } from "./frame-type.schema";
import { raceSchema } from "./race.schema";
import { archetypeSchema } from "./archetype.schema";
import { attributeSchema } from "./attribute.schema";
import { linkMarkerSchema } from "./link-marker.schema";
import { pricePartialSchema } from "./price.schema";
import { cardSetPartialSchema } from "./card-set.schema";

export const cardSchema = commonIdNameSchema.extend({
  identifiant: zod.number(),
  enName: zod.string(),
  description: zod.string(),
  atk: zod.number().nullable(),
  def: zod.number().nullable(),
  level: zod.number().nullable(),
  scale: zod.number().nullable(),
  linkVal: zod.number().nullable(),
  imageUrl: zod.string(),
  imageUrlSmall: zod.string(),
  type: zod.lazy(() => typeSchema),
  frameType: zod.lazy(() => frameTypeSchema),
  race: zod.lazy(() => raceSchema),
  archetype: zod.nullable(zod.lazy(() => archetypeSchema)),
  attribute: zod.nullable(zod.lazy(() => attributeSchema)),
  price: zod.lazy(() => pricePartialSchema),
  cardSets: zod.array(zod.lazy(() => cardSetPartialSchema)),
  linkMarkers: zod.array(zod.lazy(() => linkMarkerSchema)),
});

export const cardPartialSchema = zod.object({
  identifiant: zod.number(),
  enName: zod.string(),
  description: zod.string(),
  atk: zod.number().nullable(),
  def: zod.number().nullable(),
  level: zod.number().nullable(),
  scale: zod.number().nullable(),
  linkVal: zod.number().nullable(),
  imageUrl: zod.string(),
  imageUrlSmall: zod.string(),
  type: zod.string().optional(),
  frameType: zod.string().optional(),
  race: zod.string().optional(),
  archetype: zod.string().optional(),
  attribute: zod.string().optional(),
  price: zod.string().optional(),
  cardSets: zod.string().array().optional(),
  linkMarkers: zod.string().array().optional(),
});

export const cardOneResponseSchema = zod.object({
  data: cardSchema,
});

export const cardArrayResponseSchema = zod.object({
  data: cardSchema.array(),
});