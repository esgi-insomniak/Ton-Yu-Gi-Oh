import * as zod from "zod";

export const commonIdNameSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
});
