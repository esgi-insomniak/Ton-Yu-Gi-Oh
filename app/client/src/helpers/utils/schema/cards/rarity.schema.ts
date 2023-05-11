import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const raritySchema = commonIdNameSchema.extend({
  code: zod.string(),
});

export const rarityOneResponseSchema = zod.object({
  data: raritySchema,
});

export const rarityArrayResponseSchema = zod.object({
  data: raritySchema.array(),
});