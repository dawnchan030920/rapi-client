import { z } from "zod";
import { rapiSchemaSchema } from "./schema";

const structureSchema = z.object({
  name: z.string(),
  schema: rapiSchemaSchema,
});

type Structure = z.infer<typeof structureSchema>;

export { type Structure, structureSchema };
