import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const attributeSchema = commonIdNameSchema.extend({});

export const attributeOneResponseSchema = zod.object({
  data: attributeSchema,
});

export const attributeArrayResponseSchema = zod.object({
  data: attributeSchema.array(),
});