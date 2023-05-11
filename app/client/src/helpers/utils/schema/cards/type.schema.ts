import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const typeSchema = commonIdNameSchema.extend({});

export const typeOneResponseSchema = zod.object({
  data: typeSchema,
});

export const typeArrayResponseSchema = zod.object({
  data: typeSchema.array(),
});